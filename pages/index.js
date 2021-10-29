import Head from "next/head";
import { Heading, Link, Text, Code, Flex, Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
const Web3 = require("web3");
import { abi } from "../abi";
import { bytecode } from "../bytecode";
import { useState } from "react";
export default function Home() {
  const [deployed, setDeployed] = useState(false);

  useEffect(() => {
    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    var account = null;
    async function getAccounts() {
      if (window.ethereum) {
        await window.ethereum.send("eth_requestAccounts");
        window.web3 = new Web3(window.ethereum);
      }
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
    }
    getAccounts();
    // Call the deploy function on button click to launch wallet
    const deploy = async (abi, bytecode) => {
      const contract = new web3.eth.Contract(abi).deploy({
        data: bytecode,
        arguments: [],
      });
      var estimateGas = await contract.estimateGas();

      var deployedContract = await contract.send({
        from: account,
        gas: estimateGas,
      });
      console.log(deployedContract.options.address);
      return deployedContract.options.address;
    };
    console.log(abi, bytecode);
    deploy(abi, bytecode);
  }, [deployed]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex>
          <Button
            colorScheme="blue"
            onClick={() => {
              setDeployed(true);
            }}
          >
            Conncect Wallet
          </Button>
        </Flex>
        <Heading as="h1" size="2xl" mb="2">
          Welcome to{" "}
          <Link color="spacejelly" href="https://nextjs.org">
            Next.js!
          </Link>
        </Heading>

        <Text fontSize="xl" mt="2">
          Get started by editing <Code>pages/index.js</Code>
        </Text>

        <Flex
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          maxW="800px"
          mt="10"
        >
          <Box
            as="a"
            href="https://nextjs.org/docs"
            p="6"
            m="4"
            borderWidth="1px"
            rounded="lg"
            flexBasis={["auto", "45%"]}
          >
            <Heading as="h3" size="lg" mb="2">
              Documentation &rarr;
            </Heading>
            <Text fontSize="lg">
              Find in-depth information about Next.js features and API.
            </Text>
          </Box>

          <Box
            as="a"
            href="https://nextjs.org/learn"
            p="6"
            m="4"
            borderWidth="1px"
            rounded="lg"
            flexBasis={["auto", "45%"]}
          >
            <Heading as="h3" size="lg" mb="2">
              Learn &rarr;
            </Heading>
            <Text fontSize="lg">
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Box>

          <Box
            as="a"
            href="https://github.com/vercel/next.js/tree/master/examples"
            p="6"
            m="4"
            borderWidth="1px"
            rounded="lg"
            flexBasis={["auto", "45%"]}
          >
            <Heading as="h3" size="lg" mb="2">
              Examples &rarr;
            </Heading>
            <Text fontSize="lg">
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Box>

          <Box
            as="a"
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            p="6"
            m="4"
            borderWidth="1px"
            rounded="lg"
            flexBasis={["auto", "45%"]}
          >
            <Heading as="h3" size="lg" mb="2">
              Deploy &rarr;
            </Heading>
            <Text fontSize="lg">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Box>

          <Box
            as="a"
            href="https://chakra-ui.com/"
            p="6"
            m="4"
            borderWidth="1px"
            rounded="lg"
            flexBasis={["auto", "45%"]}
          >
            <Heading as="h3" size="lg" mb="2">
              Chakra UI &rarr;
            </Heading>
            <Text fontSize="lg">
              Build accessible React apps & websites with speed.
            </Text>
          </Box>
        </Flex>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
