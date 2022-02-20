/* eslint-disable node/no-unpublished-import */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from "ethers";
import { config, ethers } from "hardhat";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  fs.unlinkSync(`${config.paths.artifacts}/contracts/contractAddress.ts`);

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await owner.getAddress()
  );
  console.log("Owner balance:", (await owner.getBalance()).toString());

  const Token = await ethers.getContractFactory("TestToken", owner);
  const tokenContract = await Token.deploy();
  await tokenContract.deployed();
  saveFrontendFiles(tokenContract, "TokenContract");

  console.log("Token deployed to:", tokenContract.address);

  const RatchetAuction = await ethers.getContractFactory("RatchetAuction");
  const auctionContract = await RatchetAuction.deploy(
    "Impact Cert Auction",
    "ICA"
  );
  await auctionContract.deployed();
  saveFrontendFiles(auctionContract, "RatchetAuctionContract");
}

// https://github.com/nomiclabs/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
function saveFrontendFiles(contract: Contract, contractName: string) {
  fs.appendFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contract.address}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
