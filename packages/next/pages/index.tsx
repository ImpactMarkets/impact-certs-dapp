import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useProvider } from "wagmi";
import {
  Button,
  Layout,
  Loader,
  WalletOptionsModal,
  ImpactCertCard,
} from "../components";
import ImpactCertGrid from "@/components/ImpactCertGrid";

const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const provider = useProvider();

  const loading = false;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    return (
      <div>
        <ImpactCertCard
          image="image_url"
          id="0"
          title="Test Impact Cert Title"
          address="0x98Cf755EC5d9b4e1B9189e78F4134042bcbe44e6"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat, lorem vitae pretium pellentesque, metus mauris dictum arcu, eget facilisis ex urna sed risus. Ut eleifend efficitur velit, ut mattis urna auctor sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras congue porttitor arcu et venenatis. Morbi orci lectus, tristique quis ipsum sit amet, rutrum malesuada nibh. Nulla lacinia urna at mi sollicitudin blandit."
          attributes="random"
        />
        <ImpactCertCard
          image="image_url"
          id="0"
          title="Test Impact Cert Title"
          address="0x98Cf755EC5d9b4e1B9189e78F4134042bcbe44e6"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat, lorem vitae pretium pellentesque, metus mauris dictum arcu, eget facilisis ex urna sed risus. Ut eleifend efficitur velit, ut mattis urna auctor sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras congue porttitor arcu et venenatis. Morbi orci lectus, tristique quis ipsum sit amet, rutrum malesuada nibh. Nulla lacinia urna at mi sollicitudin blandit."
          attributes="random"
        />
        <ImpactCertCard
          image="image_url"
          id="0"
          title="Test Impact Cert Title"
          address="0x98Cf755EC5d9b4e1B9189e78F4134042bcbe44e6"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat, lorem vitae pretium pellentesque, metus mauris dictum arcu, eget facilisis ex urna sed risus. Ut eleifend efficitur velit, ut mattis urna auctor sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras congue porttitor arcu et venenatis. Morbi orci lectus, tristique quis ipsum sit amet, rutrum malesuada nibh. Nulla lacinia urna at mi sollicitudin blandit."
          attributes="random"
        />
      </div>
    );
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
