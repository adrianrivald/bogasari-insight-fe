import { useNavigate, useSearchParams } from "react-router-dom";
import "./global.css";

import { renderFallback, Router } from "./routes/sections";
import { useEffect } from "react";
import { setSession } from "./sections/auth/session/session";
// ----------------------------------------------------------------------

export default function App() {
  const [url] = useSearchParams();
  const token = url.get("token");
  const userId = url.get("id");
  const email = decodeURIComponent(url.get("email") ?? "");
  const expires = url.get("expires") ?? new Date();
  const isoDate = new Date(expires).toISOString();
  const role = url.get("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setSession(token ?? "", isoDate, {
        email: email ?? "",
        role: role ?? "",
        id: Number(userId) ?? 0,
      });
      setTimeout(() => {
        window.location.href = "/";
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
