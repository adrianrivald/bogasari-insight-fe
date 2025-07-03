import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "./providers/auth";
import { Bounce, toast } from "react-toastify";
import PinInput from "../../components/ui/pin-input";
import { SuccessRegistrationView } from "./success-registration-view";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CheckEmailForgotPasswordView } from "./check-email-forgot-password-view";

export function VerifyOtpView({
  email,
  isForgotPassword = false,
}: {
  email: string;
  isForgotPassword?: boolean;
}) {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState(Array(6).fill(""));

  const onVerifyAuthCode = useCallback(async () => {
    const code = values.join("");
    console.log(code, "code");
    setIsSubmitting(true);
    try {
      await verifyOtp({
        email: email,
        otp: code,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (isForgotPassword) {
        navigate("/reset-password");
      }
    } catch (error: any) {
      const errorMessage = error.message ?? "Terjadi error, silakan coba lagi";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [values]);

  if (isSubmitted && !isForgotPassword) {
    return <SuccessRegistrationView />;
  }

  if (isSubmitted && isForgotPassword) {
    return <CheckEmailForgotPasswordView email={email} />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "85vh", // 👈 full viewport height
      }}
    >
      {" "}
      {/* Signup content */}
      {/* Heading */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30 },
            fontWeight: { xs: "bold" },
          }}
        >
          Kode Verifikasi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
          }}
        >
          Kami telah mengirimkan kode verifikasi ke alamat email Anda.
        </Typography>
      </Box>
      <Box mt={8}>
        <PinInput values={values} setValues={setValues} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
        }}
      >
        <LoadingButton
          onClick={onVerifyAuthCode}
          loading={isSubmitting}
          loadingIndicator={
            <CircularProgress sx={{ color: "#FFF" }} size={20} />
          }
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{
            margin: "auto",
            marginTop: 30,
            borderRadius: 3,
            py: 1.5,
            backgroundColor: "blue.500",
          }}
        >
          Verifikasi
        </LoadingButton>
      </Box>
    </Box>
  );
}
