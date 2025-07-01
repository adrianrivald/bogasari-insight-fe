import { Helmet } from "react-helmet-async";
import { CompleteProfileView } from "../../../sections/auth/complete-profile-view";

// ----------------------------------------------------------------------

export default function CompleteProfile() {
  return (
    <>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <CompleteProfileView />
    </>
  );
}
