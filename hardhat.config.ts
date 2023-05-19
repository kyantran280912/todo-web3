import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const lineaTestnet = {
  url: "https://rpc.goerli.linea.build/",
  chainId: 59140,
  accounts: ["10be182dde91dd32a7389cad7f8bf332e8065a38b840efb3cdd1b52e2791a5d3"],
};


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    linea: lineaTestnet
    
},
};

export default config;
