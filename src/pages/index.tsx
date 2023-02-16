import { Heading, Button, useToast } from '@chakra-ui/react'
import { Head } from '../components/layout/Head'
import Image from 'next/image'
import { LinkComponent } from '../components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useSigner, useAccount, useBalance, useNetwork, useProvider } from 'wagmi'
import { ethers } from 'ethers'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, METADATA_NFT_1, METADATA_NFT_2, METADATA_NFT_3 } from '../utils/config'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [userBal, setUserBal] = useState<string>('')
  const [txLink, setTxLink] = useState<string>('')
  const [isContractOwner, setIsContractOwner] = useState<boolean>(false)

  const { address } = useAccount()
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { data: bal } = useBalance({
    address: address,
  })
  const network = useNetwork()
  const toast = useToast()

  const explorerUrl = network.chain?.blockExplorers?.default.url

  useEffect(() => {
    const val = Number(bal?.formatted).toFixed(3)
    setUserBal(String(val) + ' ' + bal?.symbol)
    checkOwnership()
  }, [bal?.formatted, bal?.symbol, address])

  const checkOwnership = async () => {
    try {
      const nft = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider as any)
      console.log('address:', address)
      const call = await nft.owner()
      console.log('owner:', call)
      if (call === address) {
        setIsContractOwner(true)
      } else {
        setIsContractOwner(false)
      }
    } catch (e) {
      console.log('error:', e)
    }
  }

  const mint = async () => {
    console.log('minting...')
    try {
      const nft = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer as any)
      setLoading(true)
      const call = await nft.mint(METADATA_NFT_1, METADATA_NFT_2, METADATA_NFT_3)
      const nftReceipt = await call.wait(1)
      console.log('tx:', nftReceipt)
      setTxLink(explorerUrl + '/tx/' + nftReceipt.transactionHash)
      setLoading(false)
      toast({
        title: 'SUCCESS! 🎉',
        description: 'You successfully minted 3 NFTs.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e: any) {
      setLoading(false)
      console.log('error:', e.message)
      if (e.code === 'UNPREDICTABLE_GAS_LIMIT') {
        toast({
          title: "CAN'T MINT TWICE",
          description: "These 3 NFTs can't be minted twice.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if (e.code === 'UNSUPPORTED_OPERATION') {
        toast({
          title: "CAN'T MINT",
          description: 'You are not allowed to call the mint function.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <>
      <Head />

      <main>
        <Heading as="h2">Continua Minter</Heading>
        <br />
        <p>Welcome to Continua Minter!</p>
        <br />
        <p>You&apos;re about to mint 3 NFTs on Ethereum Goerli Testnet. We&apos;ll switch to Ethereum Mainnet when the time&apos;s right.</p>
        <br />
        {!address ? (
          <p style={{ color: 'red' }}>
            <strong>Please connect your wallet</strong>.{' '}
          </p>
        ) : (
          <p>
            You&apos;re connected to <strong>{network.chain?.name ?? 'Ethereum'}</strong> and your wallet currently holds
            <strong> {userBal}</strong>. Just click on the &apos;Mint&apos; button below: you will be invited to sign your transaction: you will mint
            3 different NFTs.{' '}
          </p>
        )}
        <br />
        {!isContractOwner ? (
          <p style={{ color: 'red' }}>
            You can&apos;t use this app. Either you&apos;re not the owner of the NFT smart contract or{' '}
            <strong>you&apos;re not connected with the right wallet account</strong>.
          </p>
        ) : (
          <p>
            Only <strong>you</strong> can mint these NFTs since you are the owner of the NFT smart contract. ✅
          </p>
        )}

        <br />
        {!loading ? (
          !txLink ? (
            <Button colorScheme="green" variant="outline" onClick={mint}>
              Mint
            </Button>
          ) : (
            <Button disabled colorScheme="green" variant="outline" onClick={mint}>
              Mint
            </Button>
          )
        ) : (
          <Button isLoading colorScheme="green" loadingText="Minting" variant="outline">
            Mint
          </Button>
        )}

        {txLink && (
          <>
            <br />
            <br />
            <p>Congratulations! 🎉</p>
            <br />
            <p>You can view your transaction on Etherscan:</p>
            <br />
            <LinkComponent target="blank" href={txLink}>
              {txLink}
            </LinkComponent>
          </>
        )}

        <p>
          <br />
          Your NFT contract is deployed to Ethereum Goerli Testnet at{' '}
          <strong>
            <a href="https://goerli.etherscan.io/address/0x33AC35D661c72Ef0265F26dd897A126818FAFbB2#code">
              0x33AC35D661c72Ef0265F26dd897A126818FAFbB2
            </a>
          </strong>
          . Here&apos;s the source code:
        </p>
        <br />

        <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <Image
            width={1000}
            height={1000}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            alt="contract-image"
            src="/continua-contracts.png"
            priority
          />
        </div>
      </main>
    </>
  )
}
