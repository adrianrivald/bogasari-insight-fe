import {
  Box,
  CircularProgress,
  FormHelperText,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "./providers/auth";
import { Bounce, toast } from "react-toastify";
import PinInput from "../../components/ui/pin-input";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CheckEmailForgotPasswordView } from "./check-email-forgot-password-view";
import { ResetPasswordView } from "./reset-password-view";
import { varAlpha } from "../../theme/styles";

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
  const [isOtpError, setIsOtpError] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [values, setValues] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);

  const onVerifyAuthCode = useCallback(async () => {
    const code = values.join("");
    setIsSubmitting(true);
    if (!isForgotPassword) {
      setIsLoading(true);
      try {
        await verifyOtp(
          {
            email: email,
            otp: code,
          },
          true
        );
        setIsSubmitting(false);
        setIsSubmitted(true);
      } catch (error: any) {
        setIsOtpError(true);
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    } else {
      setIsOtpEntered(true);
    }
  }, [values]);

  if (isSubmitted && isForgotPassword) {
    return <CheckEmailForgotPasswordView email={email} />;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="1 1 auto"
      >
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: 320,
            bgcolor: (theme) =>
              varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "85vh",
      }}
      maxWidth={{
        md: 600,
      }}
      marginX={{
        md: "auto",
      }}
    >
      {" "}
      {/* Signup content */}
      {/* Heading */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 20, md: 28 },
            fontWeight: { xs: "bold" },
            textAlign: {
              md: "center",
            },
          }}
        >
          Kode Verifikasi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 12, md: 14 },
            mt: { xs: 1 },
            textAlign: {
              md: "center",
            },
          }}
        >
          Kami telah mengirimkan kode verifikasi ke alamat email Anda.
        </Typography>
      </Box>
      <Box mt={8}>
        <PinInput isError={isOtpError} values={values} setValues={setValues} />

        {isOtpError && (
          <FormHelperText sx={{ color: "error.main", mt: 2 }}>
            Kode verifikasi salah. Pastikan Anda memasukkan kode dengan benar.{" "}
          </FormHelperText>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          position: {
            xs: "absolute",
            md: "relative",
          },
          bottom: {
            xs: 40,
            md: 0,
          },
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
            marginTop: {
              xs: 30,
              md: 4,
            },
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
