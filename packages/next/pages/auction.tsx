
import { useState, Fragment } from "react";
import type { NextPage } from "next";
import { useContract, useNetwork, useSigner, useWaitForTransaction } from "wagmi";
import { Layout, WalletOptionsModal } from "../components";
import { Alert, Button, Spinner, TextInputField, TextareaField, TagInput, FormField, FilePicker } from "evergreen-ui";
import auctionABI from "../abis/ratchetauction.json";
import minterABI from "../abis/minter.json";

const auctionAddress = "0x4eCcf02e326D9aE57CaB44FC7c734F6adDbBb2D7";
const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";

const Auction: NextPage = () => {
    const [showWalletOptions, setShowWalletOptions] = useState(false);

    const [nft, setNFT] = useState("0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9");
    const [tokenId, setTokenId] = useState(0);
    const [issuer, setIssuer] = useState('');
    const [minPercentRaise, setMinPercentRaise] = useState(20000);
    const [ownerFee, setOwnerFee] = useState(20000);
    const [auctionToken, setAuctionToken] = useState('0x07865c6E87B9F70255377e024ace6630C1Eaa37F');
    const [minBid, setMinBid] = useState(0);
    const [txHash, setTxHash] = useState('');
    const [{ data: waitData, error: errorWait, loading }, wait] = useWaitForTransaction();

    const [submit, setSubmit] = useState(false);
    const [{ data: networkData, error: errorNetwork, loading: loadingNetwork }, switchNetwork] = useNetwork();
    const [{ data, error, loading: loadingSigner }, getSigner] = useSigner();
    if (networkData?.chain?.name != "Ropsten" && switchNetwork) {
        switchNetwork(3);
    }
    const auction = useContract({
        addressOrName: auctionAddress,
        contractInterface: auctionABI,
        signerOrProvider: data,
    })
    const minter = useContract({
        addressOrName: minterAddress,
        contractInterface: minterABI,
        signerOrProvider: data,
    })
    const startAuction = async () => {
        setSubmit(true);
        const approve = await minter.approve(auctionAddress, tokenId);
        const waiting = await wait({ hash: approve.hash });
        setTxHash(approve.hash);
        const result = await auction.start(nft, tokenId, issuer, minPercentRaise, ownerFee, auctionToken, minBid);
        setTxHash(result.hash);
    }
    const renderContent = () => {
        return <Fragment>
            <TextInputField label="NFT Address" required value={nft} disabled onChange={({ target }: any) => setNFT(target.value)} />
            <TextInputField label="Token ID" required type="number" value={tokenId} onChange={({ target }: any) => setTokenId(target.value)} />
            <TextInputField label="Issuer" required value={issuer} onChange={({ target }: any) => setIssuer(target.value)} />
            <TextInputField label="Minimum Percent Raise" required type="number" value={minPercentRaise} onChange={({ target }: any) => setMinPercentRaise(target.value)} />
            <TextInputField label="Previous Owner Profit Share" required type="number" value={ownerFee} onChange={({ target }: any) => setOwnerFee(target.value)} />
            <TextInputField label="Auction Token" required value={auctionToken} disabled onChange={({ target }: any) => setAuctionToken(target.value)} />
            <TextInputField label="Minimum Bid" required type="number" value={minBid} onChange={({ target }: any) => setMinBid(target.value)} />
            <Button disabled={submit} onClick={startAuction}>Submit Auction</Button>
            {txHash && <Alert intent="success" title="Your Auction is being created!">View the transaction on <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`} rel="noreferrer">Etherscan</a> </Alert>}
        </Fragment>
    }
    return <Fragment>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />
      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="full_width">{renderContent()}</div>
      </Layout>
    </Fragment>
}

export default Auction;