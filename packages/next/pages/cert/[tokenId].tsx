import type { NextPage } from "next";
import { useRouter } from "next/router";
import type ImpactCert from "../../types/ImpactCert";
import { useState, Fragment } from "react";
import { useContract, useProvider, useNetwork, useWaitForTransaction } from "wagmi";
import minterABI from "../../abis/minter.json";
import erc20ABI from '../../abis/erc20.json';
import ethers from "ethers";
import auctionABI from "../../abis/ratchetauction.json";
import { Button, TextInputField } from "evergreen-ui";
import {
  Layout,
  Loader,
  WalletOptionsModal,
} from "../../components";
import approved_list from "../../public/approved_cert_list";

const auctionAddress = "0x4eCcf02e326D9aE57CaB44FC7c734F6adDbBb2D7";
const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";

const ImpactCertDetail: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const provider = useProvider();
  const [{ data: networkData, error: networkError, loading }, switchNetwork] = useNetwork();
  const contract = useContract({
    addressOrName: minterAddress,
    contractInterface: minterABI,
    signerOrProvider: provider,
  });
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [cert, setCert] = useState<ImpactCert>();
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  const fetchCert = async () => {
    const owner: string = await contract.ownerOf(tokenId);
    const ipfs: string = await contract.tokenURI(tokenId);
    const resp = await fetch(ipfsAddr(ipfs));
    const cert = await resp.json();
    console.log(cert);
    cert.owner = owner;
    cert.id = parseInt(tokenId as string);
    setCert(cert);
  };

  if (networkData?.chain?.name == "Ropsten") {
    if (!loadingNFTs) {
      fetchCert();
      setLoadingNFTs(true);
    }
  }
  const ipfsAddr = (ipfs: string) => {
    return `https://nftstorage.link/ipfs/${ipfs.substring(7)}`;
  };

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    return (
      <Fragment>
        <div className="detailed_cert_container">
          <div className="detailed_cert_card">
            <div>
              {cert?.id && approved_list.approved_list.includes(cert?.id) ? (
                <div className="approved_parent">
                  <div className="approved">👌</div>
                  <div className="helper">Approved by the core team!</div>
                </div>
              ) : (
                <div className="approved_parent">
                  <div className="approved">🤷‍♂️</div>
                  <div className="helper">
                    Could be good, could be worthless!
                  </div>
                </div>
              )}
              {cert?.image ? (
                <div className="cert_img_container">
                  <img
                    className="cert_img"
                    src={ipfsAddr(cert?.image)}
                    alt="Impact certificate image"
                  />
                </div>
              ) : (
                <div>No image</div>
              )}
            </div>
            <div className="cert_title">{cert?.name}</div>
            <div className="cert_owner">
              Owned by{" "}
              <a
                href={"https://ropsten.etherscan.io/address/" + cert?.owner}
                target="_blank"
                rel="noreferrer"
              >
                <u>{cert?.owner && cert?.owner.substring(0, 8)}</u>...
              </a>
            </div>
            <div className="cert_description">{cert?.description}</div>
            {cert?.tags && (
              <div className="cert_tags">
                {cert?.tags.filter(String).join(", ")}
              </div>
            )}
            {(cert?.owner &&
              cert?.owner == "0x4eCcf02e326D9aE57CaB44FC7c734F6adDbBb2D7") && (
                  <Button className="buy button" disabled>Buy (coming soon)</Button>
              )}
          </div>
        </div>
      </Fragment>
    );
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
        <div className="full_width">{renderContent()}</div>
      </Layout>
    </Fragment>
  );
};

export default ImpactCertDetail;
