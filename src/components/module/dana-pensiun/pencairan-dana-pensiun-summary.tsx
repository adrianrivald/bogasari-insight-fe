import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { AppLayout } from "../../../layouts/layout";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { SuccessPencairanDanaView } from "../../../sections/pencairan-dana-pensiun/summary/success-pencairan-dana";
import { SuccessPencairanDana } from "./success-pencairan-dana-pensiun";

export function SummaryPencairanDanaPensiun() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewKTP, setPreviewKTP] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // await ...
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error: any) {
      console.log("here");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  if (isSuccess) {
    return <SuccessPencairanDana />;
  }

  return (
    <>
      <Box>
        <Box>
          <Typography fontWeight="bold">Informasi Pencairan</Typography>
          <Stack mt={2} gap={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              borderBottom="1px solid #EFF1F5"
              pb={2}
            >
              <Typography sx={{ color: "grey.500" }}>
                Alasan Pencairan
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
          <Typography fontWeight="bold">Unggah Dokumen</Typography>
          <Stack mt={2} gap={2}>
            <Stack
              direction="row"
              border="1px solid #EFF1F5"
              p={2}
              justifyContent="space-between"
            >
              <Stack direction="row" gap={2} alignItems="center">
                <Box>
                  <Box
                    component="img"
                    src={preview}
                    sx={{
                      width: "45px",
                      height: "30px",
                      cursor: "pointer",
                      margin: "auto 0",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Stack gap={0}>
                  <Typography fontWeight="bold">Rekening Bank</Typography>
                </Stack>
              </Stack>

              <Box
                component="img"
                src="/images/icons/checkmark.svg"
                width={24}
                height={24}
                margin="auto 0"
              />
            </Stack>
            <Stack
              direction="row"
              border="1px solid #EFF1F5"
              p={2}
              justifyContent="space-between"
            >
              <Stack direction="row" gap={2} alignItems="center">
                <Box>
                  <Box
                    component="img"
                    src={preview}
                    sx={{
                      width: "45px",
                      height: "30px",
                      cursor: "pointer",
                      margin: "auto 0",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Stack gap={0}>
                  <Typography fontWeight="bold">KTP</Typography>
                </Stack>
              </Stack>

              <Box
                component="img"
                src="/images/icons/checkmark.svg"
                width={24}
                height={24}
                margin="auto 0"
              />
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
            <Stack direction="row" justifyContent="space-between" width="100%">
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

      <LoadingButton
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        loading={isSubmitting}
        loadingIndicator={<CircularProgress sx={{ color: "#FFF" }} size={20} />}
        onClick={handleSubmit}
        sx={{
          mt: 4,
          borderRadius: 3,
          py: 1.5,
          backgroundColor: "blue.500",
        }}
      >
        Kirim Dokumen
      </LoadingButton>
    </>
  );
}
