import type { NextPage } from "next";
import { ReactNode } from "react";
import type ImpactCert from "../../types/ImpactCert";

interface Props {
    children: ReactNode;
    cert: ImpactCert
}

const ImpactCertDetail: NextPage<Props> = ({ cert }: Props) => {
    return <div>Impace Cert details</div>
}

export default ImpactCertDetail;