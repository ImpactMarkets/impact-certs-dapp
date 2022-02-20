import { useState, Fragment } from "react";
// import type { NextPage } from "next";
import Script from "next/script";
import { useAccount, useBalance, useProvider } from "wagmi";
import { Layout, Loader, WalletOptionsModal } from "../components";
import Image from "next/image";

const Home = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const provider = useProvider();

  const loading = false;

  const [filter, setFilter] = useState("all");

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    return (
      <Fragment>
        <body>
          <div className="body">
            <div className="hero">
              Creating a market for public goods on Ethereum.
              <div>
                One <span className="blue">impact certificate</span> at a time.
              </div>
            </div>
            <div className="cta_flex">
              <a
                href="https://t.me/+OUrehF7DNI9kZDcx"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="discord_button"
                  src="/telegram.png"
                  alt="Telegram Logo"
                  width="150"
                />
              </a>
              <a
                href="https://discord.gg/7zMNNDSxWv"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="discord_button"
                  src="/discord_logo.png"
                  alt="Discord Logo"
                />
              </a>
            </div>
            <div className="cta_discord">
              Help build or join the discussion!
            </div>
            <div className="explainer">
              <div className="header">What is this?</div>
              <div className="explainer_flex">
                <div className="explainer_card">
                  <img src="/telescope.png" alt="telescope" />
                  <div>
                    It's easy to tell if an action{" "}
                    <span className="blue">was good</span>. It's hard to tell if
                    an action <span className="blue">will be good.</span>
                  </div>
                </div>
                <div className="explainer_card">
                  <img src="/funding.png" alt="funding" />
                  Retroactive funders solve the (comparatively) easy problem.
                </div>
                <div className="explainer_card">
                  <img src="/rocket.png" alt="rocket" />
                  We're creating a profitable market for impact certificates to
                  solve the hard problem.
                </div>
              </div>
            </div>
            <div className="step_back">
              <div className="header">Let's take a step back</div>
              <div className="step_back_details">
                <p>
                  We want to solve the biggest problems. Climate change, nuclear
                  war, unaligned AI, pandemic risks, longevity,{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://slatestarcodex.com/2014/07/30/meditations-on-moloch"
                  >
                    Moloch
                  </a>
                  , etc.
                </p>
                <p>
                  But it's currently hard to make money funding or working on
                  these problems. The solutions to these problems are{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://en.wikipedia.org/wiki/Public_good_(economics)"
                  >
                    public goods
                  </a>
                  , which are currently hard to profit off of. We are forced to
                  rely on nation-states or philanthropy to supply these goods.
                </p>
                <p>
                  <b>
                    Enter impact certificates: a way to maximize good while
                    maximizing profit.
                  </b>
                </p>
                <p>
                  Impact certificates are NFTs issued to people who have done
                  something good, e.g. publishing a seminal research paper on
                  carbon capture, starting a new nonprofit to develop and
                  distribute Covid vaccines, or donating to an NGO that directly
                  transfers cash to poor people.
                </p>
                <p>
                  The owner of the impact certificate can sell it to someone
                  else, attributing the impact of the positive action to the new
                  owner. This creates a marketplace where profit-maximizing
                  actors are incentivized to buy undervalued certificates to
                  resell them.
                </p>
                <p>
                  Good impact speculators make a profit and bad speculators lose
                  their money and leave the market. This steers the market where
                  the price of the certificate is tied to how effective the good
                  deed it represents was (e.g. the NFT for 200 tons of CO2
                  sequestered should be twice as valuable as the NFT for 100
                  tons of CO2 sequestered).
                </p>
                <p>
                  {" "}
                  We believe that this impact marketplace, fully matured, can
                  incentivize capitalism to notice the trillion-dollar bills
                  left on the sidewalk and deploy the full force of the
                  (decentralized) financial system towards supplying these
                  goods.
                </p>
              </div>
            </div>
            <div className="mint_cta">
              Create your own impact certificate
              <div className="mint_cta_details">
                impactcerts.com is currently in Alpha and on the Ropsten test
                net
              </div>
              <a href="/minter">
                <div className="mint_button">Mint</div>
              </a>
            </div>

            <div className="faq">
              <div className="header">FAQ</div>

              <h3 className="question">
                <button aria-expanded="false">
                  Why will impact certificate prices track their expected
                  impact?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  We are still working on fleshing out and describing the formal
                  incentive mechanism design(s) that could underpin this. As it
                  stands, the current theory relies on informal design.
                </p>

                <p>
                  We are thinking about having a Funding Pool that comes from
                  fees from each transaction in the impact certificate
                  marketplace, as well as any donations. This pool would be
                  managed by experts who will buy up the best impact
                  certificates. We also think it’s likely there will be
                  effective altruism-oriented billionaires who want to buy them
                  up and may follow the guidance of the pool. These large
                  purchasers, including the pool itself, can be viewed as Final
                  Buyers who want to buy and hold certificates to influence
                  smaller actors in the market via demand. Speculators would
                  only want to buy impact certificates that are likely to be
                  bought by these impact-aligned final buyers.
                </p>

                <p>
                  Third parties can create a verification layer by attesting to
                  whether an impact certificate NFT is the original or a scam.
                  Beyond that, they can judge whether it is trustworthy or not,
                  or provide an estimated expected impact along different
                  criteria.
                </p>

                <p>
                  Impact certificates can go out to those who help design the
                  impact marketplace to be more likely to accurately price good
                  things.
                </p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  Are these certificates tax-deductible at some point in the
                  market process?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>We don’t know. Can you help us figure this out?</p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  Where does the profit incentive come from?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  The existence of philanthropically-minded Final Buyers,
                  mentioned above, will likely motivate buying pressure for
                  smaller traders to buy undervalued certificates in hopes of a
                  profit. There will likely be standard altruistic interest in
                  supporting projects and egoistic interest in collecting and
                  displaying NFTs, though we want to emphasize that we want to
                  incentivize people to buy and sell the certificates in ways
                  that track the actual impact it represents rather than buying
                  what looks good in order to display virtue.
                </p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  Is this like carbon credits?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  Yes, it’s like a generalized form of carbon credits that can
                  apply to any good thing. An additional difference is that we
                  are implementing certificates as nonfungible tokens to capture
                  the unique data of each impact that was made, whereas carbon
                  credits are typically fungible tokens that don’t differentiate
                  the actions that occurred.
                </p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  What kind of public goods/impacts would this fund?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  Anything! We are thinking of starting off with focusing on
                  supporting the open-source developer community. We are
                  especially excited about causes the effective altruism
                  movement cares about, such as preventing human extinction
                  risks, global poverty, and animal welfare.
                </p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  How is this unique? How does it differ from other projects in
                  this space?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  There are charity NFT projects. As far as we know, there are
                  no projects with an explicit focus on reselling the NFTs and
                  using them as a representation for ownership of impacts
                  sellable for profit.
                </p>
              </div>

              <h3 className="question">
                <button aria-expanded="false">
                  Doesn’t financializing altruistic things turn them into
                  something corrupted by the incentives of capitalism?
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 9 9">
                    <rect className="vert" height="7" width="1" y="1" x="4" />
                    <rect height="1" width="7" y="4" x="1" />
                  </svg>
                </button>
              </h3>
              <div hidden className="question_text">
                <p>
                  We want more good things to happen. We think that if the
                  financial apparatus is turned onto solving the huge problems
                  we face, then more of those good things will happen.
                  Potentially, way more. Are there going to be externalities
                  produced by impact certificates that can’t be resolved by
                  throwing more impact certificates at improving the impact
                  certificate system and resolving those externalities? Likely.
                  But if people have to sacrifice their resources in order to
                  make things better, this is a poor way of incentivizing them
                  to do so. The non-profit world is ready for disruption, and we
                  expect impact certificates to cause more total altruism to
                  happen.
                </p>
              </div>
            </div>
          </div>

          <footer className="footer">
            ImpactCerts.com - An Open Source Public Good
          </footer>

          <Script id="accordian">{`
      (function () {
        const headings = document.querySelectorAll('h3');

        Array.prototype.forEach.call(headings, h => {
          let btn = h.querySelector('button');
          let target = h.nextElementSibling;

          btn.onclick = () => {
            let expanded = btn.getAttribute('aria-expanded') === 'true';

            btn.setAttribute('aria-expanded', !expanded);
            target.hidden = expanded;
          }
        });
      })();`}
      </Script>
        </body>
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
        showWalletOptions={false}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="full_width">{renderContent()}</div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;
