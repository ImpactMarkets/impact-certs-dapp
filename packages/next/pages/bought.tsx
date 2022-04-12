import { useState, Fragment } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useProvider } from "wagmi";
import { Layout, Loader, WalletOptionsModal } from "../components";
import ImpactCertGrid from "@/components/ImpactCertGrid";
import { Checkbox, Select } from "evergreen-ui";

const Gallery: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const [filter, setFilter] = useState("all");
  const [checked, setChecked] = useState(true);

  const renderContent = () => {
    return (
      <Fragment>
        <div className="airtable_container">
          <div className="header">Purchased Impact</div>
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/shrn0n44h6Ctk5Gzc?backgroundColor=red&viewControls=on"
            height="650"
          ></iframe>
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

export default Gallery;
