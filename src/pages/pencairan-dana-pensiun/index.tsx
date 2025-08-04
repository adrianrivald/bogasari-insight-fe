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
        <title> {`Pencairan Dana Pensiun - Bogasari Insight`}</title>
      </Helmet>

      <PencairanDanaPensiunView />
    </>
  );
}
