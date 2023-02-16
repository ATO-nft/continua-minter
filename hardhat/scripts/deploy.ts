// npx hardhat run scripts/deploy.ts --network goerli
import hre, { ethers, network, artifacts } from 'hardhat'
import fs from 'fs'
const color = require('cli-color')
var msg = color.xterm(39).bgXterm(128)
// import { METADATA_NFT_1, METADATA_NFT_2, METADATA_NFT_3 } from '../../src/lib/consts'

async function main() {
  console.log('\nNFT contract deployment in progress...')
  const NFT = await ethers.getContractFactory('NFT')
  const nft = await NFT.deploy()
  await nft.deployed()
  console.log('\nNFT deployed at', msg(nft.address), '✅')

  fs.writeFileSync('store.json', JSON.stringify({ nft: nft.address }, undefined, 2))

  fs.writeFileSync('nftAbi.json', JSON.stringify(artifacts.readArtifactSync('NFT').abi, null, 2))
  console.log('\nNFT ABI available in nftAbi.json ✅')

  try {
    console.log('\nEtherscan verification in progress...')
    await nft.deployTransaction.wait(6)
    await hre.run('verify:verify', { network: network.name, address: nft.address, constructorArguments: [] })
    console.log('Etherscan verification done. ✅')
  } catch (error) {
    console.error(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
