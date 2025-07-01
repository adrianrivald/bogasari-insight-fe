import { Helmet } from "react-helmet-async";
import { SignUpView } from "../../../sections/auth/sign-up-view";

// ----------------------------------------------------------------------

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <SignUpView />
    </>
  );
}
