import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { AppLayout } from "../../layouts/layout";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export function DanaPensiunView() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [isShowDatePopup, setIsShowDatePopup] = useState(false);
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);

  const onClickFillDate = () => {
    setIsShowDatePopup((prev) => !prev);
  };

  const onFilterDate = () => {
    setIsShowDatePopup(false);
    setDateFilter(dateValue);
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  return (
    <AppLayout menuTitle="Dana Pensiun">
      {dateFilter === null ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          {/* User info */}
          <Stack direction="column" gap={2} mt={4}>
            <Box component="img" src="/images/dana-pensiun-empty.png" />
          </Stack>

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
                textAlign: "center",
              }}
            >
              Belum bisa melihat dana pensiunmu
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 14 },
                mt: { xs: 2 },
                textAlign: "center",
              }}
            >
              Lengkapi dulu tanggal bergabung agar estimasi dana bisa
              ditampilkan
            </Typography>
          </Box>
          <Button
            onClick={onClickFillDate}
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              margin: "auto",
              marginTop: 24,
              borderRadius: 3,
              py: 1.5,
              backgroundColor: "blue.500",
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontWeight: "normal",
            }}
          >
            <Box
              component="img"
              src="/images/icons/calendar.svg"
              width={16}
              height={16}
            />
            Isi Tanggal Bergabung
          </Button>
        </Box>
      ) : (
        <Box>konten dana pensiun terfilter</Box>
      )}

      <Dialog
        open={isShowDatePopup}
        onClose={() => setIsShowDatePopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 14 }}>
          Pilih Tanggal
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#49454F" }}
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Typography fontWeight="bold" fontSize={24}>
                Tanggal Join
              </Typography>
              <Box
                component="img"
                src="/images/icons/black-calendar.svg"
                width={24}
                height={24}
              />
            </Stack>

            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Tanggal"
                  value={dateValue}
                  onChange={handleChangeDate}
                  slotProps={{
                    textField: {
                      // error: dateValue === null,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsShowDatePopup(false)}
            sx={{
              color: "#4AA1F3",
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Batal
          </Button>
          <Button
            onClick={onFilterDate}
            autoFocus
            sx={{ color: "#4AA1F3", fontWeight: "normal" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}
