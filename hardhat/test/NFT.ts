import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

/*
  Ato standard contract : ERC721 with resale rights
*/
describe('=== NFT ===', function () {
  async function deployContractsFixture() {
    // Create signers
    const [issuer, acquirer] = await ethers.getSigners()

    // const name = 'Black Thistle'
    // const symbol = 'THISTLE'
    // const uri = 'bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json'
    // const mintNumber = 1
    // const royalties = 1.5 * 100 // 1.5% resale rights

    // Create instance of Ato.sol
    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy()
    await nft.deployed()

    return { issuer, acquirer, nft }
  }

  describe('Deployment', function () {
    it('Should deploy NFT.sol', async function () {
      const { nft, issuer } = await loadFixture(deployContractsFixture)
      expect(await nft.owner()).to.equal(issuer.address)
    })
  })

  describe('Transfers', function () {
    it('Should mint 3 NFTs', async function () {
      const { nft, issuer } = await loadFixture(deployContractsFixture)
      const uri1 = 'ipfs://bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json'
      const uri2 = 'ipfs://bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json'
      const uri3 = 'ipfs://bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json'
      await nft.mint(uri1, uri2, uri3)
      expect(await nft.ownerOf(1)).to.equal(issuer.address)
    })
  })
})
