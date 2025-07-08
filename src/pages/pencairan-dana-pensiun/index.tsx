import { Helmet } from "react-helmet-async";
import { PencairanDanaPensiunView } from "../../sections/pencairan-dana-pensiun/pencairan-dana-pensiun-view";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function PencairanDanaPensiun() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <PencairanDanaPensiunView />
    </>
  );
}
