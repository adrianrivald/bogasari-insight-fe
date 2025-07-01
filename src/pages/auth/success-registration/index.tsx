import { Helmet } from "react-helmet-async";
import { SuccessRegistrationView } from "../../../sections/auth/success-registration-view";

// ----------------------------------------------------------------------

export default function SuccessRegistration() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <SuccessRegistrationView />
    </>
  );
}
