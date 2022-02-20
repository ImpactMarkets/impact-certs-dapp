# Impact Certs Dapp

Building a market for public goods using Impact Certificate NFTs. This repository contains the auction contracts and dapp for minter, gallery, and buying/selling.

We use nft.storage for decentralized storage of the NFTs since Ratchet auctions last forever, we need perpetual storage to store immutable NFT metadata that links the NFT to the impact of the issuer.

## Getting Started

```bash
cd nextjs-hardhat

yarn install
```

Start Nextjs Server

```bash
yarn dev
```

Start Hardhat Network

```bash
yarn chain
```
