import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import type ImpactCert from "../../types/ImpactCert";
import { useState, Fragment } from "react";
import Image from "next/image";
import { ConstructorFragment } from "ethers/lib/utils";
import { useContract, useProvider, useNetwork } from "wagmi";
import minterABI from "../../abis/minter.json";
import { Card, Pane } from "evergreen-ui";
import { MdTextRotationAngledown } from "react-icons/md";
import {
  ImpactCertCard,
  Layout,
  Loader,
  WalletOptionsModal,
} from "../../components";
import approved_list from "../../public/approved_cert_list";
import { Certificate } from "crypto";

const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";
const ipfsAddr = (ipfs: string) => {
  return `https://ipfs.io/ipfs/${ipfs.substring(7)}`;
};

const ImpactCertDetail: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const provider = useProvider();
  const [{ data, error, loading }, switchNetwork] = useNetwork();
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
    cert["owner"] = owner;
    cert["id"] = tokenId;
    setCert(cert);
  };
  if (data?.chain?.name == "Ropsten") {
    if (!loadingNFTs) {
      fetchCert();
      setLoadingNFTs(true);
    }
  }
  const ipfsAddr = (ipfs: string) => {
    return `https://ipfs.io/ipfs/${ipfs.substring(7)}`;
  };

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    return (
      <Fragment>
        <div className="detailed_cert_container">
          <div className="detailed_cert_card">
            <div>
              {cert?.id && approved_list.approved_list.includes(parseInt(cert?.id)) && (
                <div className="approved">👌</div>
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
            <div className="cert_description">
              {cert?.description}
            </div>
            {cert?.tags && (
              <div className="cert_tags">{cert?.tags.join(", ")}</div>
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
