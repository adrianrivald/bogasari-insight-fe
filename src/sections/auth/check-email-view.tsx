import { Box, Button, Typography } from "@mui/material";

export function CheckEmailView() {
  return (
    <Box>
      {/* Check email image */}
      <Box
        component="img"
        src="/images/email-illustration.png"
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

      {/* Signup content */}

      {/* Heading */}
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
          Cek Email Kamu
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
            textAlign: "center",
          }}
        >
          Kami baru saja kirim email verifikasi ke kotak masuk kamu. Yuk dicek
          biar proses daftarnya bisa selesai.
        </Typography>
      </Box>
      <Button
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
        Cek Kotak Masuk
      </Button>
    </Box>
  );
}
