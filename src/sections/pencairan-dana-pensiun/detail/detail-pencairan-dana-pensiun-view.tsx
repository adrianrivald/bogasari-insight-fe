import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { AppLayout } from "../../../layouts/layout";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function DetailPencairanDanaView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewKTP, setPreviewKTP] = useState("");

  return (
    <AppLayout menuTitle="Pencairan Dana Pensiun">
      {/* Balance */}

      <>
        <Box>
          <Box mt={4}>
            <Typography fontWeight="bold">Detail Pengajuan</Typography>
            <Stack mt={2} gap={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Nomor Pengajuan
                </Typography>
                <Typography fontWeight="bold">PP-2024-001234</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Tanggal Pengajuan
                </Typography>
                <Typography fontWeight="bold">15 Jan 2024</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Jenis Pencairan
                </Typography>
                <Typography fontWeight="bold">Pensiun</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box mt={4}>
            <Typography fontWeight="bold">Rekening Tujuan</Typography>
            <Stack mt={2} gap={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>Nama Bank</Typography>
                <Typography fontWeight="bold">BCA</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>No Rekening</Typography>
                <Typography fontWeight="bold">009423748</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Rekening Tujuan
                </Typography>
                <Typography fontWeight="bold">Budi Susanto</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box mt={4}>
            <Typography fontWeight="bold">Rincian Dana</Typography>
            <Stack mt={2} gap={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Total Dana Pensiun
                </Typography>
                <Typography fontWeight="bold">Rp840.000.000</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #EFF1F5"
                pb={2}
              >
                <Typography sx={{ color: "grey.500" }}>Pajak 5%</Typography>
                <Typography fontWeight="bold">Rp5.673.455</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography sx={{ color: "grey.500", fontWeight: "bold" }}>
                  Total Diterima
                </Typography>
                <Typography fontWeight="bold" sx={{ color: "#19AF66" }}>
                  Rp845.673.455
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box mt={4} p={4} bgcolor="#EFF1F5" borderRadius={2}>
            <Stack direction="row" gap={1} alignItems="center">
              <Box
                component="img"
                src="/images/icons/info.svg"
                width={20}
                height={20}
              />
              <Typography fontWeight={600}>Penting untuk Diketahui</Typography>
            </Stack>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5em",
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li style={{ color: "black" }}>
                <Typography variant="body1">
                  Pencairan tidak dapat dibatalkan
                </Typography>
              </li>
              <li style={{ color: "black" }}>
                <Typography variant="body1">
                  Proses pencairan membutuhkan waktu 3-5 hari kerja
                </Typography>
              </li>
              <li style={{ color: "black" }}>
                <Typography variant="body1">
                  Pastikan data rekening sudah benar
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </>
    </AppLayout>
  );
}
