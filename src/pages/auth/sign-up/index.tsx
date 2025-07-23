import { Helmet } from "react-helmet-async";
import { SignUpView } from "../../../sections/auth/sign-up-view";
import { useAuth } from "../../../sections/auth/providers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function SignUp() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/");
  //   }
  // }, [isAuth]);

  return (
    <>
      <Helmet>
        <title> {`Sign up - Bogasari Insight`}</title>
      </Helmet>

      <SignUpView />
    </>
  );
}
