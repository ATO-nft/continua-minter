import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'

dotenv.config()

const { GOERLI_TESTNET_ENDPOINT_URL, GOERLI_TESTNET_PRIVATE_KEY, ETHEREUM_MAINNET_ENDPOINT_URL, ETHEREUM_MAINNET_PRIVATE_KEY, ETHERSCAN_API_KEY } =
  process.env

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // gasReporter: {
  //   currency: 'USD',
  //   gasPrice: 26,
  //   enabled: true,
  // },
  mocha: {
    timeout: 100000,
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: GOERLI_TESTNET_ENDPOINT_URL || '',
      accounts: GOERLI_TESTNET_PRIVATE_KEY !== undefined ? [GOERLI_TESTNET_PRIVATE_KEY] : [],
    },
    mainnet: {
      url: ETHEREUM_MAINNET_ENDPOINT_URL || '',
      accounts: ETHEREUM_MAINNET_PRIVATE_KEY !== undefined ? [ETHEREUM_MAINNET_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY || '',
      mainnet: ETHERSCAN_API_KEY || '',
    },
  },
}

export default config
