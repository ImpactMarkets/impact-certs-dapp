import { Card } from "evergreen-ui";
import Image from "next/image";
import approved_list from "../public/approved_cert_list";
import Link from "next/link";
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
    <Link href={"/cert/" + id} passHref>
      <Card
        elevation={3}
        padding={20}
        margin={20}
        textAlign="center"
        borderRadius={15}
        className="cert_card"
      >
        <div>
          {approved_list.approved_list.includes(id) ? (
            <div className="approved_parent">
              <div className="approved">👌</div>
              <div className="helper">Approved by the core team!</div>
            </div>
          ) : (
            <div className="approved_parent">
              <div className="approved">🤷‍♂️</div>
              <div className="helper">Could be good, could be worthless!</div>
            </div>
          )}
          {image ? (
            <div className="cert_img_container">
              <img
                className="cert_img"
                src={image}
                alt="Impact certificate image"
              />
            </div>
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
        {tags && (
          <div className="cert_tags">{tags.filter(String).join(", ")}</div>
        )}
      </Card>
    </Link>
  );
}
