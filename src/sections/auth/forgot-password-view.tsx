import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Form } from "../../components/form/form";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "./providers/auth";
import { CheckEmailForgotPasswordView } from "./check-email-forgot-password-view";
import { Bounce, toast } from "react-toastify";
import { VerifyOtpView } from "./verify-otp-view";

export function ForgotPasswordView() {
  const { forgotPassword } = useAuth();
  const [inputtedEmail, setInputtedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(async (formData: any) => {
    setIsSubmitting(true);
    try {
      await forgotPassword({ email: formData?.email });
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
    return <CheckEmailForgotPasswordView email={inputtedEmail} />;
  }

  return (
    <Box>
      {/* Heading */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30 },
            fontWeight: { xs: "bold" },
          }}
        >
          Lupa Password
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
          }}
        >
          Masukkan alamat email yang kamu pakai buat login, nanti kami kirim
          link untuk reset password-nya!
        </Typography>

        {/* Form */}
        <Form width="100%" mt={4} onSubmit={handleSubmit}>
          {({ register, formState, watch, setValue }) => (
            <>
              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.email)}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("email", {
                    required: "Email harus diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                    onChange: (e) => {
                      setValue("email", e.target.value);
                      setInputtedEmail(e.target.value);
                    },
                  })}
                />
                {formState?.errors?.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.email?.message)}
                  </FormHelperText>
                )}
              </Box>

              <LoadingButton
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                loading={isSubmitting}
                loadingIndicator={
                  <CircularProgress sx={{ color: "#FFF" }} size={20} />
                }
                disabled={
                  Boolean(formState?.errors?.email) ||
                  watch("email")?.length === 0
                }
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  backgroundColor: "blue.500",
                }}
              >
                Kirim Link Reset
              </LoadingButton>
            </>
          )}
        </Form>
      </Box>
    </Box>
  );
}
