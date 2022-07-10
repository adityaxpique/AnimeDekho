import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Head>
        <title>AnimeDekho</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
};

export default MyApp;
