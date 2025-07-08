import { Box, Stack, Typography } from "@mui/material";
import { AppLayout } from "../../../layouts/layout";
import { useState } from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Check,
  CheckCircleOutline,
  HourglassBottom,
} from "@mui/icons-material";

export function DetailPencairanDanaView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewKTP, setPreviewKTP] = useState("");

  return (
    <AppLayout withPadding={false} menuTitle="Pencairan Dana Pensiun">
      <>
        <Box>
          <Stack
            position="relative"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: "#FFF7E5",
              px: {
                xs: 3,
                lg: 4,
              },
              py: 4,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="/images/bg-pending-2.svg"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
            <Box
              component="img"
              src="/images/bg-pending-1.svg"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <Typography fontWeight="bold">Status Pengajuan</Typography>
            <Typography color="#996B00" fontWeight={600}>
              Dalam Proses
            </Typography>
          </Stack>
          <Box
            mt={4}
            sx={{
              p: {
                xs: 3,
                lg: 4,
              },
            }}
          >
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

          <Box
            mt={4}
            sx={{
              p: {
                xs: 3,
                lg: 4,
              },
            }}
          >
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

          <Box
            mt={4}
            sx={{
              p: {
                xs: 3,
                lg: 4,
              },
            }}
          >
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

          <Box
            sx={{
              p: {
                xs: 3,
                lg: 4,
              },
            }}
          >
            <Typography fontWeight="bold">Proses Pengajuan</Typography>

            <Timeline
              position="right"
              sx={{
                "& .MuiTimelineItem-root::before": {
                  content: "none", // Removes the ::before element completely
                },
                px: 0,
                mt: 2,
              }}
            >
              {/* Step 1 - Verifikasi */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="success">
                    <Check />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 4 }}>
                  <Typography fontWeight="bold">Verifikasi Dokumen</Typography>
                  <Typography color="text.secondary">
                    Pengajuan sedang ditinjau untuk persetujuan manajemen
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              {/* Step 2 - In Progress */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="warning">
                    <AccessTimeIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 4 }}>
                  <Typography fontWeight="bold">Proses Persetujuan</Typography>
                  <Typography color="text.secondary">
                    Pengajuan sedang ditinjau untuk persetujuan manajemen
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              {/* Step 3 - Pending */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="grey">
                    <HourglassBottom />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 4 }}>
                  <Typography fontWeight="bold" color="text.disabled">
                    Proses Pencairan
                  </Typography>
                  <Typography color="text.disabled">
                    Pengajuan sedang dalam proses persetujuan manajemen
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              {/* Step 4 - Pending */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="grey">
                    <HourglassBottom />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 4 }}>
                  <Typography fontWeight="bold" color="text.disabled">
                    Dana Dicairkan
                  </Typography>
                  <Typography color="text.disabled">
                    Dana sedang diproses untuk ditransfer ke rekening Anda
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              {/* Step 5 - Final */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="grey">
                    <HourglassBottom />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="bold" color="text.disabled">
                    Selesai
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
        </Box>
      </>
    </AppLayout>
  );
}
