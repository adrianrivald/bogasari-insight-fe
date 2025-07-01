import {
  Box,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Form } from "../../components/form/form";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const countries = [
  { code: "+62", label: "🇮🇩", name: "Indonesia" },
  { code: "+1", label: "🇺🇸", name: "USA" },
  { code: "+91", label: "🇮🇳", name: "India" },
  // Add more if needed
];

export function CompleteProfileView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [countryCode, setCountryCode] = useState("+62");

  const handleSubmit = useCallback(async (formData: any) => {
    console.log("Form data:", formData);
    setIsSubmitting(true);
    try {
      // await login({ email: formData?.email, password: formData?.password });
      setIsSubmitting(false);
    } catch (error) {
      console.log("error");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
                  error={Boolean(formState?.errors?.no_ktp)}
                  fullWidth
                  label="NO KTP"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("no_ktp", {
                    required: "No. KTP harus diisi",
                  })}
                />
                {formState?.errors?.no_ktp && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.no_ktp?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.nik_karyawan)}
                  fullWidth
                  label="NIK Karyawan"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("nik_karyawan", {
                    required: "NIK Karyawan harus diisi",
                  })}
                />
                {formState?.errors?.nik_karyawan && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.nik_karyawan?.message)}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  error={Boolean(formState?.errors?.full_name)}
                  fullWidth
                  label="Nama Lengkap"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                  {...register("full_name", {
                    required: "Nama Lengkap harus diisi",
                  })}
                />
                {formState?.errors?.full_name && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.full_name?.message)}
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
                        error: dateValue === null,
                      },
                    }}
                  />
                </LocalizationProvider>
                {dateValue === null && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    Tanggal lahir harus diisi
                  </FormHelperText>
                )}
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Nomor HP"
                  variant="outlined"
                  {...register("no_hp", {
                    required: "NO HP harus diisi",
                  })}
                  error={Boolean(formState?.errors?.no_hp)}
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
                {formState?.errors?.no_hp && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {String(formState?.errors?.no_hp?.message)}
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
                disabled={
                  Boolean(formState?.errors?.email) ||
                  watch("email")?.length === 0
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
    </Box>
  );
}
