import "../styles/globals.css";
import "../styles/ImpactCertCard.css";
import "../styles/Menu.css";
import "../styles/Mint.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { Provider, defaultChains } from "wagmi";
import { providers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import { RatchetAuctionContract } from "../../hardhat/artifacts/contracts/contractAddress";


const alchemyId: string = process.env.REACT_APP_ALCHEMY_ID || 'DBSiDF9pY6VRNbhDuSaKrO2-ED2YbK8E';
const chains = defaultChains;

type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector;

const provider = ({ chainId }: { chainId?: number }) => new providers.AlchemyProvider(chainId, alchemyId);

  const connectors = (): Connector[] => {
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: "impact-certs",
        },
      }),
    ];
  };

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect provider={provider} connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  );
}