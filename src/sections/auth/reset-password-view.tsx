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
import { ResetPasswordSuccessView } from "./reset-password-success-view";
import { Bounce, toast } from "react-toastify";

export function ResetPasswordView({ enteredOtp }: { enteredOtp?: string }) {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = useCallback(async (formData: any) => {
    setIsSubmitting(true);
    try {
      await resetPassword({
        email: formData?.email,
        newPassword: formData?.password,
        otp: enteredOtp ?? "",
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
    return <ResetPasswordSuccessView />;
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
          Atur Ulang Password
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
          }}
        >
          Masukkan password baru kamu ya, terus konfirmasi lagi buat pastinya.
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
                  })}
                />
                {formState?.errors?.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.email?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.password)}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    sx: { borderRadius: 1 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password harus diisi",
                    minLength: {
                      value: 6,
                      message: "Password harus terdiri dari minimal 6 karakter",
                    },
                    validate: (val: string) => {
                      const hasLetter = /[A-Za-z]/.test(val);
                      const hasNumber = /[0-9]/.test(val);
                      if (!hasLetter || !hasNumber) {
                        return "Password harus kombinasi angka dan huruf";
                      }
                      return true;
                    },
                  })}
                />
                {formState?.errors?.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.password?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.confirm_password)}
                  fullWidth
                  label="Konfirmasi Password"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    sx: { borderRadius: 1 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "Konfirmasi Password wajib diisi",
                    },
                    minLength: {
                      value: 6,
                      message: "Password harus terdiri dari minimal 6 karakter",
                    },
                    validate: (val: string) => {
                      if (watch("password") !== val) {
                        return "Password tidak cocok";
                      }
                      const hasLetter = /[A-Za-z]/.test(val);
                      const hasNumber = /[0-9]/.test(val);
                      if (!hasLetter || !hasNumber) {
                        return "Password harus kombinasi angka dan huruf";
                      }
                      return true;
                    },
                  })}
                />
                {formState?.errors?.confirm_password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.confirm_password?.message)}
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
                // disabled={Object.entries(watch()).some((item) => item === "")}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  backgroundColor: "blue.500",
                }}
              >
                Kirim
              </LoadingButton>
            </>
          )}
        </Form>
      </Box>
    </Box>
  );
}
