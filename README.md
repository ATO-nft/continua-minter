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

Etherscan: [https://goerli.etherscan.io/address/0x33AC35D661c72Ef0265F26dd897A126818FAFbB2#code](https://goerli.etherscan.io/address/0x33AC35D661c72Ef0265F26dd897A126818FAFbB2#code)
OpenSea: [https://testnets.opensea.io/assets/goerli/0x33ac35d661c72ef0265f26dd897a126818fafbb2/1](https://testnets.opensea.io/assets/goerli/0x33ac35d661c72ef0265f26dd897a126818fafbb2/1)

### Costs

- Deployment: **0.04 ETH** (68 USD eq. at today's rate)
- 3 mints **0.01 ETH** (17 USD eq. at today's rate)

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
