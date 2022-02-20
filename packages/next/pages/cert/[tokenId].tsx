import type { NextPage } from "next";
import { useRouter } from 'next/router'
import { ReactNode } from "react";
import type ImpactCert from "../../types/ImpactCert";

interface Props {
    children: ReactNode;
}

const ImpactCertDetail: NextPage<Props> = () => {
    const router = useRouter()
    const { tokenId } = router.query
    return <div>Impace Cert details</div>
}

export default ImpactCertDetail;