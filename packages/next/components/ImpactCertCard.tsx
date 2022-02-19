import { Card } from "evergreen-ui";
import Image from "next/image";
interface Props {
  children?: string | JSX.Element;
  image: string;
  id: number;
  title: string;
  address: string;
  description: string;
  tags?: Array<string>;
  attributes: string;
}

const approved_list = [0, 2];

export default function ImpactCertCard({
  image,
  id,
  title,
  address,
  description,
  tags,
  attributes,
}: Props) {
  console.log("cert id", id);
  return (
    <Card
      elevation={3}
      padding={20}
      margin={20}
      textAlign="center"
      borderRadius={15}
      className="cert_card"
    >
      <div>
        {approved_list.includes(id) && <div className="approved">👌</div>}
        {image ? (
          <Image
            className="cert_img"
            src={image}
            alt="Impact certificate image"
            width={200}
            height={200}
          />
        ) : (
          <div>No image</div>
        )}
      </div>
      <div className="cert_title">{title}</div>
      <div className="cert_owner">
        Owned by{" "}
        <a
          href={"https://ropsten.etherscan.io/address/" + address}
          target="_blank"
          rel="noreferrer"
        >
          <u>{address && address.substring(0, 8)}</u>...
        </a>
      </div>
      <div className="cert_description">
        {description.length > 80
          ? description.substring(0, 80) + "..."
          : description}
      </div>
      {tags && <div className="cert_tags">{tags.join(", ")}</div>}
    </Card>
  );
}
