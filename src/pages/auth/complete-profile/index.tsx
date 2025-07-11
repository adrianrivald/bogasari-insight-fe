import { Helmet } from "react-helmet-async";
import { CompleteProfileView } from "../../../sections/auth/complete-profile-view";
import { AppLayout } from "../../../layouts/layout";

// ----------------------------------------------------------------------

export default function CompleteProfile() {
  return (
    <AppLayout>
      <Helmet>
        <title> {`Complete Profile - Bogasari Insight`}</title>
      </Helmet>

      <CompleteProfileView />
    </AppLayout>
  );
}
