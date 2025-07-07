import { Helmet } from "react-helmet-async";
import { PencairanDanaPensiunView } from "../../sections/pencairan-dana-pensiun/pencairan-dana-pensiun-view";

// ----------------------------------------------------------------------

export default function CompleteProfile() {
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <PencairanDanaPensiunView />
    </>
  );
}
