import { Box, Button, Link, Typography } from "@mui/material";

export function ResetPasswordSuccessView() {
  return (
    <Box
      maxWidth={{
        md: 600,
      }}
      marginX={{
        md: "auto",
      }}
    >
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
            fontSize: { xs: 20, md: 24 },
            fontWeight: { xs: "bold" },
            textAlign: {
              md: "center",
            },
          }}
        >
          Password Terganti
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 12, md: 16 },
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
            marginTop: {
              xs: 30,
              md: 4,
            },
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
