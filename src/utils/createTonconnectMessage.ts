import { Address, beginCell } from "@ton/ton"

import { feeStake, feeUnstake, minimumTonBalanceReserve, opDepositCoins, opUnstakeTokens } from "./constants"

export function maxAmountToStake(tonBalance: bigint): bigint {
  tonBalance -= minimumTonBalanceReserve
  return tonBalance > 0n ? tonBalance : 0n
}

interface TonConnectMessage {
  address: string
  amount: string
  stateInit: string | undefined
  payload: string | undefined
}

export function createDepositMessage(treasury: Address, amountInNano: bigint, referrer?: Address): TonConnectMessage {
  const address = treasury.toString()
  const amount = (amountInNano + feeStake).toString()
  const stateInit = undefined
  const payload = beginCell()
    .storeUint(opDepositCoins, 32)
    .storeUint(0, 64)
    .storeAddress(null)
    .storeCoins(amountInNano)
    .storeCoins(1n)
    .storeAddress(referrer)
    .endCell()
    .toBoc()
    .toString("base64")
  return {
    address,
    amount,
    stateInit,
    payload
  }
}

export function createUnstakeMessage(wallet: Address, amountInNano: bigint): TonConnectMessage {
  const address = wallet.toString()
  const amount = feeUnstake.toString()
  const stateInit = undefined
  const payload = beginCell()
    .storeUint(opUnstakeTokens, 32)
    .storeUint(0, 64)
    .storeCoins(amountInNano)
    .storeAddress(undefined)
    .storeMaybeRef(beginCell().storeUint(0, 4).storeCoins(1n))
    .endCell()
    .toBoc()
    .toString("base64")
  return {
    address,
    amount,
    stateInit,
    payload
  }
}

export function createLendNativeTokenMessage(wallet: Address, value: bigint): TonConnectMessage {
  const address = wallet.toString()
  const amount = value.toString()
  const stateInit = undefined
  const payload = beginCell()
    .storeUint(0x186a1, 32)
    .storeUint(0, 64)
    .storeCoins(value)
    .storeAddress(wallet)
    .endCell()
    .toBoc()
    .toString("base64")

  return {
    address,
    amount,
    stateInit,
    payload
  }
}

export function createWithdrawMessage(wallet: Address, amountInNano: bigint): TonConnectMessage {
  const address = wallet.toString()
  const amount = amountInNano.toString()
  const stateInit = undefined
  const payload = beginCell()
    .storeUint(0x7362d09c, 32)
    .storeUint(0, 64)
    .storeCoins(amountInNano)
    .storeAddress(wallet)
    .endCell()
    .toBoc()
    .toString("base64")
  return {
    address,
    amount,
    stateInit,
    payload
  }
}

export function createNewBorrowMessage(wallet: Address, amountInNano: bigint): TonConnectMessage {
  const address = wallet.toString()
  const amount = amountInNano.toString()
  const stateInit = undefined
  const payload = beginCell()
    .storeUint(0x186a0, 32)
    .storeUint(0, 64)
    .storeCoins(amountInNano)
    .storeAddress(wallet)
    .storeMaybeRef(beginCell().storeUint(0, 4).storeCoins(1n))
    .endCell()
    .toBoc()
    .toString("base64")
  return {
    address,
    amount,
    stateInit,
    payload
  }
}
