import { useState } from "react";
import { ConstructorFragment } from "ethers/lib/utils";
import { useContract, useProvider, useNetwork } from "wagmi";
import minterABI from "../abis/minter.json";
import { Pane } from "evergreen-ui";

interface Props {
  children?: string | JSX.Element;
}

const minterAddress = "0x89b93b72f484470f15dd181dbbff0d2b2d5b22f9";

export default function ImpactCertGrid(props: Props) {
  const provider = useProvider();
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const contract = useContract({
    addressOrName: minterAddress,
    contractInterface: minterABI,
    signerOrProvider: provider,
  });
  const [supply, setSupply] = useState(undefined);

  const fetchTotalSupply = async () => {
    console.log(data);
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply);
  };
  if (data?.chain?.name == "Ropsten") {
    fetchTotalSupply();
  }
  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Pane
      width={1300}
      height={1300}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
    ></Pane>
  );
}
