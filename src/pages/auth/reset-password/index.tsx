import { Helmet } from "react-helmet-async";
import { ResetPasswordView } from "../../../sections/auth/reset-password-view";

// ----------------------------------------------------------------------

export default function ResetPassword() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Frendz`}</title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
