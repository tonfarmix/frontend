import tonviewerIcon from "@assets/svg/tonviewer_28.svg"
import tonviewerIconDark from "@assets/svg/tonviewer_28_dark.svg"
import { Flex, Image, Link, Text, useColorModeValue } from "@chakra-ui/react"

const ViewOnTonviewer = ({ addr }: { addr: string }) => {
  const img = useColorModeValue(tonviewerIcon, tonviewerIconDark)
  return (
    <Flex py={2}>
      <Link href={`https://tonviewer.com/${addr}`} target="_blank">
        <Flex align={"center"} cursor={"pointer"}>
          <Image src={img} mr={2} w={"28px"} h={"28px"} />
          <Text letterSpacing={"0.5px"}>Tonviewer</Text>
        </Flex>
      </Link>
    </Flex>
  )
}

export default ViewOnTonviewer
