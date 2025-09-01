import { useNavigate, useSearchParams } from "react-router-dom";
import "./global.css";

import { renderFallback, Router } from "./routes/sections";
import { useEffect } from "react";
import { setSession } from "./sections/auth/session/session";
// ----------------------------------------------------------------------

export default function App() {
  const [url] = useSearchParams();
  const token = url.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setSession(token ?? "");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [token]);

  if (token) {
    return renderFallback;
  }

  return (
    <>
      <Router />
    </>
  );
}
