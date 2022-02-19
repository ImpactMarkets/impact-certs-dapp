/* eslint-disable node/no-unpublished-import */
// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
import { ethers } from "hardhat";
import { expect } from "chai";

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Ratchet Auction contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.
  let RatchetAuction;
  let TestToken;
  let TestNFT;
  let auction: any;
  let token: any;
  let nft: any;
  let initiator: { address: any };
  let addr1: { address: any };
  let addr2: { address: any };

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    TestToken = await ethers.getContractFactory("TestToken");
    TestNFT = await ethers.getContractFactory("TestNFT");
    RatchetAuction = await ethers.getContractFactory("RatchetAuction");
    [initiator, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    token = await TestToken.deploy();
    await token.deployed();

    nft = await TestNFT.deploy();
    await nft.deployed();

    auction = await RatchetAuction.deploy("Ratchet Auction", "RATCH");
    await auction.deployed();

    // Seed erc20 values in test addresses
    await token.transfer(addr1.address, 100000);
    await token.transfer(addr2.address, 100000);
  });

  describe("Deployment", function () {
    it("Should set the right auction params", async function () {
      expect(await auction.name()).to.equal("Ratchet Auction");
      expect(await auction.symbol()).to.equal("RATCH");
      // expect(await auction.initiator()).to.equal(initiator.address);
      // expect(await auction.issuer()).to.equal(initiator.address);
      // expect(await auction.minPercentRaise()).to.equal(50000);
      // expect(await auction.ownerFee()).to.equal(1000);
      // expect(await auction.auctionToken()).to.equal(token.address);
      // expect(await auction.lastPrice()).to.equal(1000);
    });
  });

  describe("Transactions", function () {
    it("Should fail when trying to buy before nft deposit", async function () {
      await expect(auction.connect(addr1).buy(15000, 1)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });

    it("Should respect ratchet auction rules", async function () {
      await nft.approve(auction.address, 1);
      await auction.start(
        nft.address,
        1,
        initiator.address,
        50000,
        1000,
        token.address,
        1000
      );
      const tokenId = 1;

      const issuerBalance = await token.balanceOf(initiator.address);
      const addr1Balance = await token.balanceOf(addr1.address);
      await token.connect(addr1).approve(auction.address, 15000);
      await auction.connect(addr1).buy(15000, tokenId);
      const addr1Balance2 = await token.balanceOf(addr1.address);
      const issuerBalance2 = await token.balanceOf(initiator.address);
      expect(issuerBalance2 - issuerBalance).to.equal(15000);
      expect(addr1Balance2 - addr1Balance).to.equal(-15000);
      expect(await auction.ownerOf(tokenId)).to.equal(addr1.address);

      const addr2Balance = await token.balanceOf(addr2.address);
      await token.connect(addr2).approve(auction.address, 30000);
      await expect(
        auction.connect(addr2).buy(20000, tokenId)
      ).to.be.revertedWith(
        "Bid must be higher than the last price + minimum raise"
      );
      await auction.connect(addr2).buy(30000, tokenId);
      const addr2Balance2 = await token.balanceOf(addr2.address);
      const addr1Balance3 = await token.balanceOf(addr1.address);
      const issuerBalance3 = await token.balanceOf(initiator.address);
      expect(addr2Balance2 - addr2Balance).to.equal(-30000);
      expect(addr1Balance3 - addr1Balance).to.equal((30000 - 15000) / 100);
      expect(issuerBalance3 - issuerBalance).to.equal(30000 - 15000 / 100);
    });

    it("Should fail if buyer doesn’t have enough tokens", async function () {
      await nft.approve(auction.address, 1);
      await auction.start(
        nft.address,
        1,
        initiator.address,
        50000,
        1000,
        token.address,
        1000
      );

      await expect(auction.connect(addr1).buy(150000, 1)).to.be.revertedWith(
        "Buyer allowance too low"
      );
    });
  });
});
