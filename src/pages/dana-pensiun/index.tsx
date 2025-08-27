import { Helmet } from "react-helmet-async";
import { DanaPensiunView } from "../../sections/dana-pensiun/dana-pensiun-view";

// ----------------------------------------------------------------------

export default function DanaPensiun() {
  return (
    <>
      <Helmet>
        <title> {`Dana Pensiun - Frendz`}</title>
      </Helmet>

      <DanaPensiunView />
    </>
  );
}
