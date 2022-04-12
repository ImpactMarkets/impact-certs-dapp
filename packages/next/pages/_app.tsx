import "../styles/globals.css";
import "../styles/ImpactCertCard.css";
import "../styles/DetailedCertCard.css";
import "../styles/Bought.css";
import "../styles/Menu.css";
import "../styles/Mint.css";
import "../styles/main.css";
import "../styles/faq.css";
import type { AppProps } from "next/app";
import { Provider, defaultChains } from "wagmi";
import { providers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import { alchemyId } from "utils/constants";

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
    <Provider provider={provider} connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  );
}