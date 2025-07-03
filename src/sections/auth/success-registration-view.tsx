import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function SuccessRegistrationView() {
  const navigate = useNavigate();

  const onClickToHome = () => {
    navigate("/complete-profile");
  };
  return (
    <Box display="flex" flex={1} flexDirection="column">
      {/* Check email image */}
      <Box
        component="img"
        src="/images/success-registration-illustration.png"
        sx={{
          width: {
            xs: "85%",
          },
          marginX: {
            xs: "auto",
          },
          display: "flex",
        }}
      />

      {/* Content */}
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30 },
            fontWeight: { xs: "bold" },
          }}
        >
          Sukses Terdaftar
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
            textAlign: "center",
          }}
        >
          Selamat, akun Anda sudah aktif! Sekarang Anda bisa mulai melihat
          informasi dana pensiun Anda kapan saja dan di mana saja.
        </Typography>
      </Box>
      <Button
        onClick={onClickToHome}
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
        Lihat Dana Pensiun Saya
      </Button>
    </Box>
  );
}
