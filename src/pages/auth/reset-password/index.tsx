import { Helmet } from "react-helmet-async";
import { ResetPasswordView } from "../../../sections/auth/reset-password-view";

// ----------------------------------------------------------------------

export default function ResetPassword() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
