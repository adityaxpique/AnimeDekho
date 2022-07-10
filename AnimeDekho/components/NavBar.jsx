import Link from "next/link";
import Sidebar from "./Sidebar";

import { Flex, HStack, Text } from "@chakra-ui/react";
const styles = {
  navText: {
    marginLeft: "10px",
    color: "white",
    cursor: "pointer",
    fontFamily: "Lato, sans-serif"
  },
};
const NavBar = () => {
  return (
    <Flex
      height="10vh"
      align="center"
      bgColor="blackAlpha.900"
      p="1em"
      shadow="dark-lg"
    >
      <Link href="/">
        <HStack style={styles.navText}>
          <Text
            as="h1"
            fontSize="1.5em"
            fontWeight="bold"
            style={styles.navText}
            letterSpacing={2}
            textColor="white"
          >
            AnimeDekho
          </Text>
        </HStack>
      </Link>
      <Sidebar />
    </Flex>
  );
};

export default NavBar;
