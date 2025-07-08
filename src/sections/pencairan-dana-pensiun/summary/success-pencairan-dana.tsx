import { Box, Button, Link, Typography } from "@mui/material";

export function SuccessPencairanDanaView() {
  return (
    <Box>
      {/* Check email image */}
      <Box
        component="img"
        src="/images/pencairan-dapen.svg"
        sx={{
          width: {
            xs: "75%",
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
            textAlign: "center",
          }}
        >
          Pengajuan Berhasil Dikirim
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
            textAlign: "center",
          }}
        >
          Pengajuan pencairan dana pensiun Anda sedang dalam proses verifikasi
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
          Kembali ke Beranda
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
          Lihat Detail Pencairan Dana
        </Button>
      </Link>
    </Box>
  );
}
