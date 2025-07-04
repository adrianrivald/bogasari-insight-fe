import { Box, Button, Link, Typography } from "@mui/material";

export function CheckEmailForgotPasswordView({ email }: { email: string }) {
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
          Kami sudah kirim email ke{" "}
          <Typography
            component="span"
            sx={{
              fontSize: { xs: 14 },
              fontWeight: { xs: "bold" },
            }}
          >
            {email}
          </Typography>{" "}
          isi petunjuk untuk ganti password kamu.
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
            marginTop: 25,
            borderRadius: 3,
            py: 1.5,
            backgroundColor: "blue.500",
          }}
        >
          Cek Kotak Masuk
        </Button>
      </Link>

      <Link href="/">
        <Button
          fullWidth
          variant="outlined"
          size="large"
          type="submit"
          sx={{
            margin: "auto",
            marginTop: 1,
            borderRadius: 3,
            py: 1.5,
            borderColor: "#EFF0F6",
            color: "#1A1C1E",
            fontWeight: "normal",
          }}
        >
          Kembali ke Login
        </Button>
      </Link>
    </Box>
  );
}
