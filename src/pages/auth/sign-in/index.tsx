import { Helmet } from "react-helmet-async";
import { SignInView } from "../../../sections/auth/sign-in-view";

// ----------------------------------------------------------------------

export default function SignIn() {
  return (
    <>
      <Helmet>
        <title> {`Sign in - Frendz`}</title>
      </Helmet>

      <SignInView />
    </>
  );
}
