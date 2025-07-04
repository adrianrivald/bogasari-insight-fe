import { Helmet } from "react-helmet-async";
import { SuccessRegistrationView } from "../../../sections/auth/success-registration-view";
import { AppLayout } from "../../../layouts/layout";

// ----------------------------------------------------------------------

export default function SuccessRegistration() {
  return (
    <AppLayout>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <SuccessRegistrationView />
    </AppLayout>
  );
}
