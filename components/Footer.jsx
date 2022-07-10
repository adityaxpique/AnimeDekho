import React from "react";
import { Flex, Text } from "@chakra-ui/react";
const styles = {
  footerText: {
    marginBottom: "24px",
    fontSize: "32px"
  },
}
const Footer = () => {
  return (
    <Flex justify="center" bgColor="blackAlpha.900">
      <Text
        fontSize="1em"
        fontWeight="semibold"
        textColor="white"
        style={styles.footerText}
      >
        Use AdBlocker for best experience!
      </Text>
    </Flex>
  );
};

export default Footer;
