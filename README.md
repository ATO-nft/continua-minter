# Continua Minter

Live at [continua-minter.netlify.app](https://continua-minter.netlify.app/).

## Install

```sh
npm i
```

## Run

```sh
npm run dev
```

## Commands

```sh
cd hardhat
npx hardhat run scripts/clear.ts
npx hardhat run scripts/deploy.ts --network goerli
```

## Example contract

- Etherscan: [https://goerli.etherscan.io/address/0xA208bB697fBdd8b1518F6921C73D2d0C1eF3e67E#code](https://goerli.etherscan.io/address/0x33AC35D661c72Ef0265F26dd897A126818FAFbB2#code)
- OpenSea: [https://testnets.opensea.io/assets/goerli/0xA208bB697fBdd8b1518F6921C73D2d0C1eF3e67E/1](https://testnets.opensea.io/assets/goerli/0x33ac35d661c72ef0265f26dd897a126818fafbb2/1)

## Deployment process

- Upload metadata
- Fix URIs
- Fix contract name
- Send ETH to deployer (0.041)
- Publish to Mainnet
- Send ETH to gallery (0.011)
- Send app url to gallery

## Supprted networks

- Ethereum Mainnet
- Goerli Testnet

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.gg/xw9dCeQ94Y), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).

## License

[GPL-3.0](https://github.com/w3hc/w3hc-web/blob/main/LICENSE)
