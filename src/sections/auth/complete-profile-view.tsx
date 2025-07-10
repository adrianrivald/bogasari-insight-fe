import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Form } from "../../components/form/form";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCompleteProfile } from "../../services/user";
import { useNavigate } from "react-router-dom";

const countries = [
  { code: "+62", label: "🇮🇩", name: "Indonesia" },
  { code: "+1", label: "🇺🇸", name: "USA" },
  { code: "+91", label: "🇮🇳", name: "India" },
  // Add more if needed
];

export function CompleteProfileView() {
  const navigate = useNavigate();
  const { mutate: completeProfile, isError } = useCompleteProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataIsNotValid, setDataIsNotValid] = useState(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [countryCode, setCountryCode] = useState("+62");

  const handleSubmit = useCallback(async (formData: any) => {
    console.log("Form data:", formData);
    setIsSubmitting(true);
    try {
      await completeProfile({
        fullName: formData.fullName,
        birthDate: dayjs(dateValue).format("DD-MM-YYYY"),
        nikEmployee: formData.nikEmployee,
        noKtp: formData.noKtp,
        phoneNumber: formData.phoneNumber,
      });
      setIsSubmitting(false);
    } catch (error: any) {
      console.log("here");
      setDataIsNotValid(true);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setDataIsNotValid(true);
    }
  }, [isError]);

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  return (
    <Box>
      {/* Heading */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30 },
            fontWeight: { xs: "bold" },
          }}
        >
          Lengkapi Profil
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14 },
            mt: { xs: 1 },
          }}
        >
          Tinggal isi data sedikit lagi buat selesain pendaftaran kamu.
        </Typography>

        {/* Form */}
        <Form width="100%" mt={4} onSubmit={handleSubmit}>
          {({ register, formState, watch, setValue }) => (
            <>
              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.noKtp)}
                  fullWidth
                  label="NO KTP"
                  variant="outlined"
                  type="text"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("noKtp", {
                    required: "No. KTP harus diisi",
                  })}
                />
                {formState?.errors?.noKtp && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.noKtp?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.nikEmployee)}
                  fullWidth
                  label="NIK Karyawan"
                  variant="outlined"
                  type="text"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("nikEmployee", {
                    required: "NIK Karyawan harus diisi",
                  })}
                />
                {formState?.errors?.nikEmployee && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.nikEmployee?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.fullName)}
                  fullWidth
                  label="Nama Lengkap"
                  variant="outlined"
                  type="text"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("fullName", {
                    required: "Nama Lengkap harus diisi",
                  })}
                />
                {formState?.errors?.fullName && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.fullName?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Tanggal Lahir"
                    value={dateValue}
                    onChange={handleChangeDate}
                    slotProps={{
                      textField: {
                        // error: dateValue === null,
                      },
                    }}
                  />
                </LocalizationProvider>
                {/* {dateValue === null &&  (
                  <FormHelperText sx={{ color: "error.main" }}>
                    Tanggal lahir harus diisi
                  </FormHelperText>
                )} */}
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Nomor HP"
                  variant="outlined"
                  {...register("phoneNumber", {
                    required: "NO HP harus diisi",
                  })}
                  onChange={(e) => {
                    setValue("phoneNumber", e.target.value);
                  }}
                  error={Boolean(formState?.errors?.phoneNumber)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          variant="standard"
                          disableUnderline
                          sx={{ mr: 1 }}
                        >
                          {countries.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                              <span style={{ marginRight: 8 }}>
                                {option.label}
                              </span>
                              {option.code}
                            </MenuItem>
                          ))}
                        </Select>
                      </InputAdornment>
                    ),
                  }}
                />
                {formState?.errors?.phoneNumber && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.phoneNumber?.message)}
                  </FormHelperText>
                )}
              </Box>

              <LoadingButton
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                loading={isSubmitting}
                loadingIndicator={
                  <CircularProgress sx={{ color: "#FFF" }} size={20} />
                }
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  backgroundColor: "blue.500",
                }}
              >
                Lanjut
              </LoadingButton>
            </>
          )}
        </Form>
      </Box>

      <Dialog
        open={dataIsNotValid}
        onClose={() => setDataIsNotValid(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Data Tidak Valid</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#49454F" }}
          >
            Data yang Anda masukkan tidak valid. Mohon periksa kembali data
            Anda. Jika masalah terus berlanjut, silakan hubungi administrator.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDataIsNotValid(false)}
            sx={{
              color: "#65676B",
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              onClick={() => navigate("/")}
              component="img"
              src="/images/icons/home.svg"
              width={24}
              height={24}
            />{" "}
            Beranda
          </Button>
          <Button
            onClick={() => setDataIsNotValid(false)}
            autoFocus
            sx={{ color: "#4AA1F3", fontWeight: "normal" }}
          >
            Periksa Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
