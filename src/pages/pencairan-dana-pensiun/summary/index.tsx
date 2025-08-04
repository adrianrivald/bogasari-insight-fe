import { Helmet } from "react-helmet-async";
import { SummaryPencairanDanaPensiunView } from "../../../sections/pencairan-dana-pensiun/summary/summary-pencairan-dana-pensiun-view";

// ----------------------------------------------------------------------

export default function SummaryPencairanDanaPensiun() {
  return (
    <>
      <Helmet>
        <title> {`Pencairan Dana Pensiun - Bogasari Insight`}</title>
      </Helmet>

      <SummaryPencairanDanaPensiunView />
    </>
  );
}
