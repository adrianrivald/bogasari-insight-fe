import { Helmet } from "react-helmet-async";
import { CheckEmailView } from "../../../sections/auth/check-email-view";

// ----------------------------------------------------------------------

export default function CheckEmail() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Frendz`}</title>
      </Helmet>

      <CheckEmailView />
    </>
  );
}
