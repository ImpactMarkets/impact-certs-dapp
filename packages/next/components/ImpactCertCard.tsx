interface Props {
  children?: string | JSX.Element;
  image: string,
  id: string,
  title: string,
  address: string,
  description: string,
  attributes: string
}

export default function ImpactCertCard({image, id, title, address, description, attributes}: Props) {

  return (<div>{title}</div>);
} 