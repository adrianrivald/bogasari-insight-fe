import { Helmet } from "react-helmet-async";
import { ForgotPasswordView } from "../../../sections/auth/forgot-password-view";

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
