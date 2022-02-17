import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useProvider } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal, ImpactCertCard } from "../components";
import ImpactCertGrid from "@/components/ImpactCertGrid";


const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const provider = useProvider()

  const loading = false;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;

    return ( <ImpactCertGrid></ImpactCertGrid>)
  };

  return (
    <>
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
    </>
  );
};

export default Home;