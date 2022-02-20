import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Button, MenuDropdown, WalletOptionsModal } from ".";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
  showWalletOptions: boolean;
  setShowWalletOptions: (showWalletOptions: boolean) => void;
}

export default function Layout(props: Props) {
  const { children, showWalletOptions, setShowWalletOptions } = props;

  const [{ data: accountData, loading }, disconnect] = useAccount({
    fetchEns: true,
  });

  const renderLabel = () => {
    if (accountData?.ens) {
      return (
        <>
          <div className="relative w-8 h-8 mr-2">
            {accountData.ens.avatar ? (
              <Image
                src={accountData?.ens.avatar}
                alt="ENS Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <Image
                src="/images/black-gradient.png"
                alt="ENS Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            )}
          </div>
          <span className="truncate max-w-[100px]">
            {accountData.ens?.name}
          </span>
        </>
      );
    }

    return (
      <span className="truncate max-w-[150px]">{accountData?.address}</span>
    );
  };

  const renderButton = () => {
    if (accountData) {
      return (
        <MenuDropdown
          label={renderLabel()}
          options={[{ label: "Disconnect", onClick: disconnect }]}
        />
      );
    }

    return (
      <Button
        loading={loading || showWalletOptions}
        onClick={() => setShowWalletOptions(true)}
      >
        Connect
      </Button>
    );
  };

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Impact Certificates</title>
        <meta name="description" content="Impact Certificates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <div>
        <div className="menu_container flex items-center justify-between p-4">
          <div className="menu flex items-center">
            <span className={router.pathname == "/" ? "active" : "non-active"}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </span>
            <span
              className={router.pathname == "/mint" ? "active" : "non-active"}
            >
              <Link href="/mint">
                <a>Mint</a>
              </Link>
            </span>
            <span
              className={
                router.pathname == ("/gallery" || "/cert")
                  ? "active"
                  : "non-active"
              }
            >
              <Link href="/gallery">
                <a>Gallery</a>
              </Link>
            </span>
            <span
              className={router.pathname == "/sell" ? "active" : "non-active"}
            >
              <Link href="/sell">
                <a>Sell</a>
              </Link>
            </span>
            <span
              className={router.pathname == "/buy" ? "active" : "non-active"}
            >
              <Link href="/buy">
                <a>Buy</a>
              </Link>
            </span>
          </div>
          {renderButton()}
        </div>
      </div>
      {children}
    </div>
  );
}
