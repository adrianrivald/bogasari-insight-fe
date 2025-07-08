import { Helmet } from "react-helmet-async";
import { DetailPencairanDanaView } from "../../../sections/pencairan-dana-pensiun/detail/detail-pencairan-dana-pensiun-view";

// ----------------------------------------------------------------------

export default function DetailPencairanDana() {
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <DetailPencairanDanaView />
    </>
  );
}
