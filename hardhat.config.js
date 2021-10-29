require("@nomiclabs/hardhat-waffle");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

module.exports = {
  networks: {
    hardhat: {
      chainID: 80001,
    },
    mumbai: {
      url: `https://rpc-mumbai.matic.today`,
     // accounts: ['your metamask account private key'],
    },
    mainnet: {
      url: ` https://polygon-rpc.com/`,
    //  accounts: ['your metamask account private key'],
    },
  },

  solidity: "0.8.4",
};
