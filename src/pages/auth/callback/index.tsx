// src/pages/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`${API_URL}v1/auth/google/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important if backend sets cookies
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Login success:", data);
          navigate("/"); // or wherever
        })
        .catch((err) => {
          console.error("Login error", err);
        });
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
}
