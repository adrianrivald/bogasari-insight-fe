import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from "@mui/icons-material";
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
import { SvgColor } from "../../components/svg-color";
import { Form } from "../../components/form/form";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "./providers/auth";
import { CheckEmailView } from "./check-email-view";
import { Bounce, toast } from "react-toastify";
import { VerifyOtpView } from "./verify-otp-view";

export function SignUpView() {
  const { register } = useAuth();
  const [inputtedEmail, setInputtedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = useCallback(async (formData: any) => {
    setIsSubmitting(true);
    try {
      const res = await register({
        email: formData?.email,
        password: formData?.password,
      });
      console.log(res, "res");
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

  const handleGoogleLogin = () => {
    console.log("Google login");
    // Add your Google login logic here
  };

  if (isSubmitted) {
    return <VerifyOtpView email={inputtedEmail} />;
  }

  return (
    <Box>
      {/* Illustration image */}
      <Box
        component="img"
        src="/images/signup-illustration.png"
        sx={{
          width: {
            // xs: "35%",
            xs: "100%",
          },
          margin: "auto",
          display: "flex",
        }}
      />

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
          Daftar Akun
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
          }}
        >
          Yuk buat akun dulu biar bisa lanjut!
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
                    validate: (val: string) => {
                      if (watch("password") !== val) {
                        return "Password tidak cocok";
                      }
                    },
                  })}
                />
                {formState?.errors?.confirm_password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.confirm_password?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ textAlign: "right", mb: 3 }}>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Lupa Password?
                </Link>
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
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  backgroundColor: "blue.500",
                  // boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                  // "&:hover": {
                  //   background:
                  //     "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                  //   boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  // },
                }}
              >
                Daftar
              </LoadingButton>
            </>
          )}
        </Form>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          my={2}
        >
          <Box bgcolor="#EFF1F5" height={2} width="100%" />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#666",
            }}
          >
            Atau
          </Typography>
          <Box bgcolor="#EFF1F5" height={2} width="100%" />
        </Box>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={
            <Box component="img" width={20} src="/images/google.png" />
          }
          onClick={handleGoogleLogin}
          sx={{
            fontWeight: "normal",
            borderRadius: 3,
            py: 1.5,
            borderColor: "#ddd",
            color: "#666",
            "&:hover": {
              borderColor: "#ccc",
              background: "#f9f9f9",
            },
          }}
        >
          Lanjutkan dengan Google
        </Button>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 8,
              fontSize: {
                xs: 14,
              },
            }}
          >
            Sudah punya akun?{" "}
            <Link
              href="/"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "medium",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Masuk
            </Link>
          </Typography>

          <Typography variant="caption" sx={{ color: "#999" }}>
            powered by{" "}
            <Link
              href="#"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
              }}
            >
              Tadda
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
