import { Helmet } from "react-helmet-async";
import { DanaPensiunView } from "../../sections/dana-pensiun/dana-pensiun-view";

// ----------------------------------------------------------------------

export default function CompleteProfile() {
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <DanaPensiunView />
    </>
  );
}
