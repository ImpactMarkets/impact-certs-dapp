import { Card } from "evergreen-ui";
interface Props {
  children?: string | JSX.Element;
  image: string;
  id: string;
  title: string;
  address: string;
  description: string;
  tags?: Array<string>;
  attributes: string;
}

export default function ImpactCertCard({
  image,
  id,
  title,
  address,
  description,
  tags,
  attributes,
}: Props) {
  return (
    <Card
      elevation={3}
      padding={20}
      margin={50}
      width={400}
      height={400}
      textAlign="center"
      borderRadius={15}
      className="cert_card"
    >
      <div>
        <img
          className="cert_img"
          src="https://ipfs.io/ipfs/bafybeigy3tbxmgyevxzazuy24r3eb3ejik6f4pc5wpdkkavrkwrc7uw4du/im.png"
        ></img>
      </div>
      <div className="cert_title">{title}</div>
      <div className="cert_owner">
        Owned by{" "}
        <a
          href={"https://ropsten.etherscan.io/address/" + address}
          target="_blank"
          rel="noreferrer"
        >
          <u>{address.substring(0, 8)}</u>...
        </a>
      </div>
      <div className="cert_description">{description.substring(0, 100)}...</div>
      {/* {tags && <div className="cert_tags">{tags.join(", ")}</div>} */}
    </Card>
  );
}
