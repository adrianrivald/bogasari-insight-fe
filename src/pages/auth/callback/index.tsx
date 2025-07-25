// pages/GoogleCallback.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Google login error:", error);
      navigate("/login"); // or show error UI
      return;
    }

    if (code) {
      // Send the code to your backend
      fetch(
        `http://localhost:3000/v1/auth/google/callback?code=${encodeURIComponent(
          code
        )}`,
        {
          method: "GET",
          credentials: "include", // optional: include cookies if needed
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
          }
          return response.json();
        })
        .then((data) => {
          // Handle success
          console.log("Login success:", data);
          localStorage.setItem("token", data.token); // Example: save token
          navigate("/dashboard"); // Redirect after login
        })
        .catch((err) => {
          console.error("Login failed:", err);
          navigate("/login");
        });
    }
  }, [searchParams, navigate]);

  return <div>Logging you in with Google...</div>;
}

export default GoogleCallback;
