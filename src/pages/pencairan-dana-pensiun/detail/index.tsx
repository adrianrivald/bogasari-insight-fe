import { Helmet } from "react-helmet-async";
import { DetailPencairanDanaView } from "../../../sections/pencairan-dana-pensiun/detail/detail-pencairan-dana-pensiun-view";

// ----------------------------------------------------------------------

export default function DetailPencairanDana() {
  return (
    <>
      <Helmet>
        <title> {`Pencairan Dana Pensiun - Bogasari Insight`}</title>
      </Helmet>

      <DetailPencairanDanaView />
    </>
  );
}
