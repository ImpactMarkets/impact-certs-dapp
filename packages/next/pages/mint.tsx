import { useState, Fragment } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useProvider } from "wagmi";
import { Layout, Loader, WalletOptionsModal } from "../components";

const Minter: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const provider = useProvider();

  const loading = false;

  const [filter, setFilter] = useState("all");

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
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
              <div className="input_title">Name*</div>
              <div>
                <input id="nft_name" type="text" />
              </div>
              <div className="input_title">Description*</div>
              <div>
                <textarea id="nft_desc" rows={4} cols={30}></textarea>
              </div>
              <div className="input_title">Owner Address*</div>
              <div>
                <input id="nft_address" type="text" />
              </div>
              <div className="input_title">Date of impact</div>
              <div className="date_button_flex">
                <div>
                  <input
                    className="date_button"
                    type="button"
                    id="one_date"
                    name="one_date"
                    value="One date"
                  />
                </div>
                <div>
                  <input
                    className="date_button"
                    type="button"
                    id="two_dates"
                    name="two_dates"
                    value="Two dates"
                  />
                </div>
                <div>
                  <input
                    className="date_button"
                    type="button"
                    id="hide_dates"
                    name="hide_dates"
                    value="No dates"
                  />
                </div>
              </div>
              <div className="input_title" id="date_1_div">
                Date 1
                <input type="date" id="date_1" />
              </div>
              <div className="input_title" id="date_2_div">
                Date 2
                <input type="date" id="date_2" />
              </div>
              <div className="input_title">Tags</div>
              <div className="tag_container">
                <input list="tags" id="tag_list" />
                <datalist id="tags">
                  <option value="Artificial Intelligence" />
                  <option value="Animal Welfare" />
                  <option value="Biorisk" />
                  <option value="Climate Change" />
                  <option value="Democracy" />
                  <option value="Effective Altruism" />
                  <option value="Longevity" />
                  <option value="Open-source Software" />
                  <option value="War" />
                  <option value="Web3" />
                </datalist>
                <div className="submit_tag" id="submit_tag">
                  + Add
                </div>
              </div>
              <div id="tag_preview"></div>
              <div className="clear_tags" id="clear_tags">
                Clear Tags
              </div>
              <div className="input_title">External URL (proof or context)</div>
              <div>
                <input id="external_url" type="text" />
              </div>
              <div className="input_title">Image</div>
              <div>
                <input className="image_input" id="nft_image" type="file" />
              </div>
              <div className="mint_button_container">
                <button className="mint">Mint</button>
              </div>
            </div>
            <div>
              <p id="loading_ipfs"></p>
              <p id="ipfs_link"></p>
              <p id="loading_mint"></p>
              <p id="mint_transaction"></p>
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
          <div className="full_width">{renderContent()}</div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Minter;
