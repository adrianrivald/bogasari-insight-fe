import { Helmet } from "react-helmet-async";
import { SummaryPencairanDanaPensiunView } from "../../../sections/pencairan-dana-pensiun/summary/summary-pencairan-dana-pensiun-view";

// ----------------------------------------------------------------------

export default function CompleteProfile() {
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <SummaryPencairanDanaPensiunView />
    </>
  );
}
