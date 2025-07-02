import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "./providers/auth";
import { Bounce, toast } from "react-toastify";
import PinInput from "../../components/ui/pin-input";
import { SuccessRegistrationView } from "./success-registration-view";

export function VerifyOtpView() {
  const { verifyOtp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onVerifyAuthCode = useCallback(async (code: string) => {
    setIsSubmitting(true);
    try {
      const res = await verifyOtp({
        email: "adrianrivaldy5@gmail.com", // TODO: fix this
        otp: code,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
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
  }, []);

  if (isSubmitted) {
    return <SuccessRegistrationView />;
  }

  return (
    <Box>
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
        <PinInput handleSubmit={onVerifyAuthCode} />
      </Box>
    </Box>
  );
}
