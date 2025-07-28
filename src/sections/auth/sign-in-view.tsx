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
import { Bounce, toast } from "react-toastify";

export function SignInView() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailPasswordNotMatch, setIsEmailPasswordNotMatch] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = useCallback(async (formData: any) => {
    setIsSubmitting(true);
    try {
      await login({ email: formData?.email, password: formData?.password });
      setIsSubmitting(false);
    } catch (error: any) {
      const errorMessage = error.message ?? "Terjadi error, silakan coba lagi";
      const isEmailPasswordNotMatchMessage = errorMessage.includes(
        "Invalid credentials"
      );
      if (isEmailPasswordNotMatchMessage) {
        setIsEmailPasswordNotMatch(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google login");
    window.location.href =
      "https://bogasari-insight-backend.onrender.com/v1/auth/google";
    // Add your Google login logic here
  };
  return (
    <Box
      maxWidth={{
        md: 600,
      }}
      marginX={{
        md: "auto",
      }}
    >
      {/* Signin content */}

      {/* Heading */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30, md: 48 },
            fontWeight: { xs: "bold" },
            textAlign: {
              md: "center",
            },
          }}
        >
          Masuk ke Akun
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14, md: 20 },
            mt: { xs: 1 },
            textAlign: {
              md: "center",
            },
          }}
        >
          Masukkan email dan password Anda untuk masuk
        </Typography>

        {/* Form */}
        <Form width="100%" mt={4} onSubmit={handleSubmit}>
          {({ register, formState, setValue }) => (
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
                  error={
                    Boolean(formState?.errors?.password) ||
                    isEmailPasswordNotMatch
                  }
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
                    onChange: (e) => {
                      setValue("password", e.target.value);
                      setIsEmailPasswordNotMatch(false);
                    },
                  })}
                />
                {formState?.errors?.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.password?.message)}
                  </FormHelperText>
                )}
                {isEmailPasswordNotMatch && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    Email dan password tidak cocok{" "}
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
                Masuk
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
            Belum punya akun?{" "}
            <Link
              href="/sign-up"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "medium",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Daftar
            </Link>
          </Typography>

          <Typography variant="caption" sx={{ color: "#999" }}>
            powered by{" "}
            <Link
              href="#"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
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
