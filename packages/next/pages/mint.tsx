import { useState, Fragment } from "react";
import { NFTStorage } from "nft.storage";
import type { NextPage } from "next";
import { useContract, useNetwork, useSigner } from "wagmi";
import { Layout, Loader, WalletOptionsModal } from "../components";
import { Alert, Button, Spinner, TextInputField, TextareaField, TagInput, FormField, FilePicker } from "evergreen-ui";
import minterABI from "../abis/minter.json";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIyRUIxYjZjNzM3MTdiODY3N0IzMzk4NDRDNTRjRjQ3NmIxMzMyM2EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTIzOTAyNjc0OSwibmFtZSI6Ik5GVCBTdG9yYWdlIFRlc3QifQ.uu933RGtkHVYdpdm81oYTJOw4iSxqcymgvFqxLc0iFQ";

const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";

const Minter: NextPage = () => {
  const nft_client = new NFTStorage({ token });

  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<FileList>();
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const tagAutocomplete = [ "Artificial Intelligence", "Animal Welfare", "Biorisk", "Climate Change", "Democracy", "Effective Altruism", "Longevity", "Open-source Software", "War", "Web3" ];

  const [{ data: networkData, error: errorNetwork, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data, error, loading: loadingSigner }, getSigner] = useSigner();
  if (networkData?.chain?.name != "Ropsten" && switchNetwork) {
    switchNetwork(3);
  }
  const minter = useContract({
    addressOrName: minterAddress,
    contractInterface: minterABI,
    signerOrProvider: data,
  })
  const mint = async () => {
    setMinting(true);
    const ipfs_res = await nft_client.store({
      name,
      description,
      image: new File(files, "im.png"),
      type: "Impact Certificate",
      tags,
      external_url: url,
    });
    const minted = await minter.safeMint(owner, ipfs_res.url);
    setTxHash(minted.hash);
  }

  const renderContent = () => {
    return (
      <Fragment>
        <div className="body">
          <div className="minter">
            <div className="header">Impact Certificate Minter</div>
            <div id="minter_form" className="minter_form">
              <div className="sub_header">
                This minter is in ALPHA. You are minting a test impact
                certificate on the Ropsten testnet.
              </div>
              <TextInputField label="Name" required value={name} onChange={({ target }: any) => setName(target.value)} />
              <TextareaField
                label="Description"
                value={description}
                required
                rows={4}
                cols={30}
                onChange={({ target }: any)=> setDescription(target.value)}
              />
              <TextInputField label="Owner Address" required value={owner} onChange={({ target }: any) => setOwner(target.value)} />
              <FormField label="Tags">
              <TagInput values={tags} onChange={setTags} autocompleteItems={tagAutocomplete}/>
              </FormField>
              <TextInputField label="External URL (proof or context)" value={url} onChange={({ target }: any) => setUrl(target.value)}/>
              <FormField label="Image">
                <FilePicker required name="image" accept="image/png, image/gif, image/jpeg" onChange={setFiles}/>
              </FormField>
              <Button disabled={loadingNetwork || loadingSigner || minting} onClick={mint}>Mint</Button>
              {loadingNetwork || loadingSigner || minting && <Spinner size={50}/>}
              {txHash && <Alert intent="success" title="Your Impact Cert is being Minted!">View the transaction on <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`} rel="noreferrer">Etherscan</a> </Alert>}
            </div>
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
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Minter;
