// pages/AuthCallback.jsx (React example)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as sessionService from "../../../sections/auth/session/session";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Assuming your backend returns a JWT

    if (token) {
      sessionService.setSession(token);
      //  setAccessToken(token);
      //  setUserInfo(JSON.stringify(rest));
      navigate("/");
    } else {
      navigate("/login?error=missing_token");
    }
  }, []);

  return <div>Processing login...</div>;
}

export default AuthCallback;
