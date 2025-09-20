import { useSearchParams } from "react-router-dom";
import "./global.css";

import { renderFallback, Router } from "./routes/sections";
import { useEffect } from "react";
import { getSession, setSession } from "./sections/auth/session/session";
import { API_URL } from "./constants";
// ----------------------------------------------------------------------

export default function App() {
  const [url] = useSearchParams();
  const token = url.get("token");
  const userId = url.get("id");
  const email = decodeURIComponent(url.get("email") ?? "");
  const expires = url.get("expires") ?? new Date();
  const isoDate = new Date(expires).toISOString();
  const role = url.get("role");
  const nikEmployee = url.get("nikEmployee");
  const getUser = async () => {
    await fetch(`${API_URL}v1/auth/users/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getSession()}`,
      },
    }).then((res) =>
      res.json().then((res) => {
        console.log(res, "res");
        if (res?.data?.noKtp !== null) {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          setTimeout(() => {
            window.location.href = "/complete-profile";
          }, 1000);
        }
      })
    );
  };

  useEffect(() => {
    if ((token ?? "")?.length > 0) {
      setSession(token ?? "", isoDate, {
        email: email ?? "",
        role: role ?? "",
        id: Number(userId) ?? 0,
      });
      // setTimeout(() => {
      //   getUser();
      // }, 1000);
      if (nikEmployee !== "null") {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setTimeout(() => {
          window.location.href = "/complete-profile";
        }, 1000);
      }
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
