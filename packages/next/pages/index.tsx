import { useState, Fragment } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useProvider } from "wagmi";
import {
  Layout,
  Loader,
  WalletOptionsModal,
} from "../components";
import ImpactCertGrid from "@/components/ImpactCertGrid";
import { Select } from "evergreen-ui";

const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const provider = useProvider();

  const loading = false;
  
  const [filter, setFilter] = useState("all");

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    return (
      <Fragment>
        <div className="filter_container">
          <Select
            className="filter"
            width={240}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all" selected>
              All
            </option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Animal Welfare">Animal Welfare</option>
            <option value="Biorisk">Biorisk</option>
            <option value="Climate Change">Climate Change</option>
            <option value="Democracy">Democracy</option>
            <option value="Effective Altruism">Effective Altruism</option>
            <option value="Longevity">Longevity</option>
            <option value="Open-source Software">Open-source Software</option>
            <option value="War">War</option>
            <option value="Web3">Web3</option>
          </Select>
        </div>
        <div>
          <ImpactCertGrid filter={filter} />
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

export default Home;
