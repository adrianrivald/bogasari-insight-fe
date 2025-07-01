import { Box, Button, Link, Typography } from "@mui/material";

export function ResetPasswordSuccessView() {
  return (
    <Box>
      {/* Check email image */}
      <Box
        component="img"
        src="/images/reset-password-illustration.png"
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

      {/* Heading */}
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mt={8}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30 },
            fontWeight: { xs: "bold" },
          }}
        >
          Password Terganti
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
            textAlign: "center",
          }}
        >
          Silakan gunakan password baru Anda untuk masuk ke akun.
        </Typography>
      </Box>

      <Link href="/">
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
          Masuk Sekarang
        </Button>
      </Link>
    </Box>
  );
}
