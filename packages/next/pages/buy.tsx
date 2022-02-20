import type { NextPage } from "next";
import { useState, Fragment } from "react";
import {
  useContract,
  useSigner,
  useNetwork,
  useWaitForTransaction,
  useContractRead,
  useToken,
} from "wagmi";
import erc20ABI from "../abis/erc20.json";
import { Contract } from "ethers";
import auctionABI from "../abis/ratchetauction.json";
import { Button, TextInputField, Alert } from "evergreen-ui";
import { Layout, WalletOptionsModal } from "../components";

const auctionAddress = "0x4eCcf02e326D9aE57CaB44FC7c734F6adDbBb2D7";

const BuyPage: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: signer, error, loading: loadingSigner }, getSigner] =
    useSigner();
  const [{ data: waitData, error: errorWait, loading: loadingWait }, wait] =
    useWaitForTransaction();
  const auction = useContract({
    addressOrName: auctionAddress,
    contractInterface: auctionABI,
    signerOrProvider: signer,
  });
  const [bid, setBid] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [buying, setBuying] = useState(false);
  const [txHash, setTxHash] = useState("");

  const checkPrice = async () => {
    const lastPrice = await auction.lastPrices(tokenId);
    const minRaise = await auction.minPercentRaises(tokenId);
    setBid((lastPrice * minRaise) / 1000.0);
  };

  const buyCert = async () => {
    setBuying(true);
    const auctionToken = await auction.auctionTokens(tokenId);
    const erc20Contract = new Contract(auctionToken, erc20ABI, signer);
    const approvalTx = await erc20Contract.approve(auctionAddress, bid);
    const waitForApproval = await wait({ hash: approvalTx.hash });
    const bidTx = await auction.buy(bid, tokenId);
    const waitForBid = await wait({ hash: bidTx.hash });
    setBuying(false);
  };
  return (
    <Fragment>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />
      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="minter">
          <div className="header">Buy an impact certificate</div>
          <div className="auction_explainer">
            Enter the ICA token ID and then click "Check Min Price" to see how
            much you have to pay to own the impact certificate. Then click "Buy" to buy it.
          </div>
          <TextInputField
            label="Min Price"
            value={bid}
            type="number"
            onChange={({ target }: any) => {
              setBid(target.value);
            }}
          />
          <TextInputField
            label="ICA Token ID"
            value={tokenId}
            type="number"
            onChange={({ target }: any) => {
              setTokenId(target.value);
            }}
          />
          <Button className="tag_input" onClick={checkPrice}>
            Check Min Price
          </Button>
          <Button className="buy button" onClick={buyCert}>
            Buy
          </Button>
          {txHash && (
            <Alert intent="success" title="Your Auction is being created!">
              View the transaction on{" "}
              <a
                target="_blank"
                href={`https://ropsten.etherscan.io/tx/${txHash}`}
                rel="noreferrer"
              >
                Etherscan
              </a>{" "}
            </Alert>
          )}
        </div>
      </Layout>
    </Fragment>
  );
};

export default BuyPage;
