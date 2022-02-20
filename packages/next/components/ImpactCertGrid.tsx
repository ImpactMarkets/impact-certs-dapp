import { useState, Fragment } from "react";
import Image from "next/image";
import { ConstructorFragment } from "ethers/lib/utils";
import { useContract, useProvider, useNetwork } from "wagmi";
import minterABI from "../abis/minter.json";
import { Pane } from "evergreen-ui";
import { MdTextRotationAngledown } from "react-icons/md";
import { ImpactCertCard } from "../components";
import approved_list from "../public/approved_cert_list";
import type ImpactCert from "../types/ImpactCert";
interface Props {
  children?: string | JSX.Element;
  filter: string;
  approvedOnly: boolean;
}

const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";
const ipfsAddr = (ipfs: string) => {
  return `https://ipfs.io/ipfs/${ipfs.substring(7)}`;
};

export default function ImpactCertGrid({ filter, approvedOnly }: Props) {
  const provider = useProvider();
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const contract = useContract({
    addressOrName: minterAddress,
    contractInterface: minterABI,
    signerOrProvider: provider,
  });
  const [supply, setSupply] = useState(undefined);
  const [NFTs, setNFTs] = useState<ImpactCert[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  const fetchNFTs = async () => {
    console.log(data);
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply);
    console.log(totalSupply);
    setNFTs(Array.from({ length: totalSupply }));
    for (let i = 0; i < totalSupply; i++) {
      const owner: string = await contract.ownerOf(i);
      const ipfs: string = await contract.tokenURI(i);
      const resp = await fetch(ipfsAddr(ipfs));
      const cert = await resp.json();
      console.log(cert);
      NFTs[i] = cert;
      NFTs[i]["owner"] = owner;
      NFTs[i]["id"] = i;
    }
    setNFTs(NFTs);
  };
  if (data?.chain?.name == "Ropsten") {
    if (!loadingNFTs) {
      fetchNFTs();
      setLoadingNFTs(true);
    }
  }
  return (
    <Fragment>
      <div className="cert_grid_container">
        <div className="cert_grid">
          {loading ? (
            <h1>Loading</h1>
          ) : (
            NFTs.filter(
              (cert) => 
              (filter == "all" || cert.tags?.indexOf(filter) >= 0)
              && (approvedOnly == false || approved_list.approved_list.includes(cert?.id))
              ).map((cert, index) =>
              cert ? (
                <ImpactCertCard
                  image={ipfsAddr(cert.image)}
                  id={cert.id}
                  title={cert.name}
                  address={cert.owner}
                  description={cert.description}
                  attributes="random"
                  tags={cert.tags}
                />
              ) : (
                <div className="cert_card">Loading</div>
              )
            )
          )}
        </div>
      </div>
    </Fragment>
  );
}
