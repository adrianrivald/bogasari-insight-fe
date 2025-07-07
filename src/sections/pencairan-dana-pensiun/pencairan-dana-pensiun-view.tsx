import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../auth/providers/auth";
import BalanceCard from "../../components/ui/balance-card";
import { AppLayout } from "../../layouts/layout";
import { Form } from "../../components/form/form";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function PencairanDanaPensiunView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (formData: any) => {
    setIsSubmitting(true);
    try {
      // await ...
      setIsSubmitting(false);
    } catch (error: any) {
      console.log("here");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <AppLayout menuTitle="Pencairan Dana Pensiun">
      {/* Balance */}
      <Box mt={4}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            bgcolor: "#17548D",
            borderRadius: 3,
            paddingY: 4,
            paddingX: 4,
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Typography sx={{ opacity: 0.9 }}>Total Dana Pensiun</Typography>
          <Typography fontSize={42} fontWeight="bold">
            Rp850.750.000
          </Typography>
        </Box>{" "}
      </Box>

      <Form width="100%" mt={4} onSubmit={handleSubmit}>
        {({ register, formState, watch, setValue }) => (
          <>
            <Box mt={4}>
              <Card
                sx={{
                  p: 2,
                }}
              >
                <Typography fontWeight="bold">Informasi Pencairan</Typography>
                <Stack mt={2} gap={2}>
                  <Stack justifyContent="space-between" width="100%">
                    <Typography sx={{ color: "grey.500" }}>
                      Alasan Pencairan
                    </Typography>

                    <FormControl fullWidth>
                      <InputLabel
                        shrink={false}
                        id="select-label"
                        style={{ display: "none" }}
                      ></InputLabel>
                      <Select
                        labelId="select-label"
                        value={watch("reason")}
                        onChange={(e) => setValue("reason", e.target.value)}
                        displayEmpty
                        sx={{ mt: 1 }}
                        renderValue={(selected) => {
                          console.log(selected, "selected");
                          if (!selected) {
                            return (
                              <Typography fontSize={14} color="GrayText">
                                Pilih alasan pencairan
                              </Typography>
                            );
                          }
                          return <Typography>{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="1">Meninggal</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </Card>
              <Card
                sx={{
                  p: 2,
                  mt: 4,
                }}
              >
                <Typography fontWeight="bold">Rekening Tujuan</Typography>
                <Stack mt={2} gap={2}>
                  <Stack justifyContent="space-between" width="100%">
                    <Typography sx={{ color: "grey.500" }}>
                      Nama Bank
                    </Typography>

                    <FormControl fullWidth>
                      <InputLabel
                        shrink={false}
                        id="select-label"
                        style={{ display: "none" }}
                      ></InputLabel>
                      <Select
                        labelId="select-label"
                        value={watch("bank_name")}
                        onChange={(e) => setValue("bank_name", e.target.value)}
                        displayEmpty
                        sx={{ mt: 1 }}
                        renderValue={(selected) => {
                          console.log(selected, "selected");
                          if (!selected) {
                            return (
                              <Typography fontSize={14} color="GrayText">
                                Pilih Bank
                              </Typography>
                            );
                          }
                          return <Typography>{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="1">BCA</MenuItem>
                        <MenuItem value="2">Mandiri</MenuItem>
                        <MenuItem value="3">BRI</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack justifyContent="space-between" width="100%">
                    <FormControl sx={{ width: "100%" }}>
                      <Typography mb={1} component="label" htmlFor="no_rek">
                        Nomor Rekening
                      </Typography>

                      <OutlinedInput
                        {...register("no_rekening", {
                          required: "No. Rekening wajib diisi",
                        })}
                        id="no_rek"
                        placeholder="Masukkan Nomor Rekning"
                        sx={{ width: "100%" }}
                        autoComplete="off"
                      />
                    </FormControl>
                  </Stack>

                  <Stack justifyContent="space-between" width="100%">
                    <FormControl sx={{ width: "100%" }}>
                      <Typography
                        mb={1}
                        component="label"
                        htmlFor="nama_rekening"
                      >
                        Nama Rekening
                      </Typography>

                      <OutlinedInput
                        {...register("nama_rekening", {
                          required: "Nama Rekening wajib diisi",
                        })}
                        id="nama_rekening"
                        placeholder="Masukkan Nama Rekning"
                        sx={{ width: "100%" }}
                        autoComplete="off"
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Card>

              <Card
                sx={{
                  p: 2,
                  mt: 4,
                }}
              >
                <Typography fontWeight="bold">Unggah Dokumen</Typography>
                <Stack mt={2} gap={2}>
                  <Stack
                    direction="row"
                    border="1px solid #EFF1F5"
                    p={2}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" gap={2}>
                      <Box component="img" src="/images/icons/wallet.svg" />
                      <Stack gap={0}>
                        <Typography fontWeight="bold">Rekening Bank</Typography>
                        <Typography mt={0}>
                          Unggah foto buku tabungan
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box component="img" src="/images/icons/plus.svg" />
                  </Stack>
                  <Stack
                    direction="row"
                    border="1px solid #EFF1F5"
                    p={2}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" gap={2}>
                      <Box component="img" src="/images/icons/ktp.svg" />
                      <Stack gap={0}>
                        <Typography fontWeight="bold">KTP</Typography>
                        <Typography mt={0}>Unggah KTP</Typography>
                      </Stack>
                    </Stack>
                    <Box component="img" src="/images/icons/plus.svg" />
                  </Stack>
                </Stack>
              </Card>
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
                mt: 4,
                borderRadius: 3,
                py: 1.5,
                backgroundColor: "blue.500",
              }}
            >
              Ajukan Dokumen
            </LoadingButton>
          </>
        )}
      </Form>
    </AppLayout>
  );
}
