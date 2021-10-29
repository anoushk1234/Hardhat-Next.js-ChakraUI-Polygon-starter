import Head from "next/head";
import { Heading, Link, Text, Code, Flex, Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { use } from "chai";

export default function Home() {
  useEffect(() => {
    var account = null;
    async function getAccounts() {
      if (window.ethereum) {
        await window.ethereum.send("eth_requestAccounts");
        if (typeof web3 !== "undefined") {
          web3 = new Web3(web3.currentProvider);
        } else {
          // set the provider you want from Web3.providers
          web3 = new Web3(
            new Web3.providers.HttpProvider("http://localhost:8545")
          );
        }
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
  }, []);

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
            onClick={async () => {
              await deploy(process.env.ABI, process.env.BYTECODE);
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
