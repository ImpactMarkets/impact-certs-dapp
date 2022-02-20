
import type { NextPage } from "next";
import { useState, Fragment } from "react";
import { useContract, useSigner, useNetwork, useWaitForTransaction, useContractRead, useToken } from "wagmi";
import erc20ABI from '../abis/erc20.json';
import { Contract } from "ethers";
import auctionABI from "../abis/ratchetauction.json";
import { Button, TextInputField, Alert, Spinner } from "evergreen-ui";
import {
  Layout,
  WalletOptionsModal,
} from "../components";

const auctionAddress = "0x4eCcf02e326D9aE57CaB44FC7c734F6adDbBb2D7";

const BuyPage: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: signer, error, loading: loadingSigner }, getSigner] = useSigner();
  const [{ data: waitData, error: errorWait, loading: loadingWait }, wait] = useWaitForTransaction();
  const auction = useContract({
    addressOrName: auctionAddress,
    contractInterface: auctionABI,
    signerOrProvider: signer,
  });
  const [bid, setBid] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [buying, setBuying] = useState(false);
  const [txHash, setTxHash] = useState('');

  const checkPrice = async () => {
        const lastPriceBigNum = await auction.lastPrices(tokenId);
        const lastPrice = lastPriceBigNum.toNumber();
        const minRaise = await auction.minPercentRaises(tokenId);
        setBid(lastPrice + lastPrice * (minRaise / 100000.0));
    };

  const buyCert = async () => {
      setBuying(true);
    const auctionToken = await auction.auctionTokens(tokenId);
    const erc20Contract = new Contract(auctionToken, erc20ABI, signer);
    const approvalTx = await erc20Contract.approve(auctionAddress, bid);
    setTxHash(approvalTx.hash);
    const waitForApproval = await wait({ hash: approvalTx.hash });
    const bidTx = await auction.buy(bid, tokenId);
    setTxHash(bidTx.hash);
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
        <div className="full_width">
        <TextInputField label="Bid" value={bid} type="number" onChange={({ target }: any) => { setBid(target.value) }}/>
        <TextInputField label="ICA Token ID" value={tokenId} type="number" onChange={({ target }: any) => { setTokenId(target.value) }}/>
        <Button onClick={checkPrice}>Check Min Price</Button>
        <Button className="buy button" onClick={buyCert}>Buy</Button>
          {txHash &&
            <Alert intent="success" title="Your Auction is being created!">
              <Spinner size={20} />
              View the transaction on{" "}
              <a
                target="_blank"
                href={`https://ropsten.etherscan.io/tx/${txHash}`}
                rel="noreferrer"
              >
                Etherscan
              </a>
            </Alert>}
        </div>
      </Layout>
    </Fragment>
  );
}

export default BuyPage;