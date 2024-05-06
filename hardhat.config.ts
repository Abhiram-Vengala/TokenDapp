import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    morphTestnet: {
      url: process.env.MORPH_TESTNET_URL || "",
      gasPrice: 3*10**9,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths :{
    artifacts : "./front_face/src/artifacts",
  },
};

export default config;
