import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AppLayout } from "../../../layouts/layout";
import React, { Suspense, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Chart from "react-apexcharts";
import { TabContext, TabPanel } from "@mui/lab";
import { useInfoMonthly } from "../../../services/dana-pensiun/use-info-monthly";
import { formatRupiah } from "../../../utils/format-rupiah";
import { useHistoryYearly } from "../../../services/dana-pensiun/use-history-yearly";
import { useAmountSummary } from "../../../services/dana-pensiun/use-amount-summary";
import { useChartYearly } from "../../../services/dana-pensiun/use-chart-yearly";
import { useChartSixMonth } from "../../../services/dana-pensiun/use-chart-six-month";
import { useCreateJoinDate } from "../../../services/dana-pensiun/use-create-join-date";
import { Bounce, toast } from "react-toastify";
import { useTransactionHistory } from "../../../services/dana-pensiun/use-transaction-history";
import { renderFallback } from "../../../routes/sections";
import { useAuth } from "../../../sections/auth/providers/auth";
import { useUserInfo } from "../../../services/user";
import HomeTab from "../../ui/home-tab";
import RekapitulasiPensiunReport from "../../report/rekapitulasi-dana";
import { pdf } from "@react-pdf/renderer";
import SaldoManfaatPDF from "../../report/saldo-manfaat";
import SaldoManfaatDetailPDF from "../../report/saldo-manfaat-detail";
import { API_URL } from "../../../constants";
import { getSession } from "../../../sections/auth/session/session";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function DanaPensiun() {
  const { userInfo: user } = useAuth();
  const [userInfo, setUserInfo] = useState<any>({});
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [isShowDatePopup, setIsShowDatePopup] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("2025");
  const [tabIndex, setTabIndex] = React.useState(0);
  const [expandedCards, setExpandedCards] = React.useState<
    Record<number, boolean>
  >({});

  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const { data: transactionHistory, error } = useTransactionHistory();
  const { data: historyYearly } = useHistoryYearly();
  const { data: infoMonthly } = useInfoMonthly();
  const { data: amountSummary } = useAmountSummary();
  const { data: chartYearly } = useChartYearly();
  const { data: chartSixMonth } = useChartSixMonth(yearFilter);
  const { mutateAsync: postJoinDate } = useCreateJoinDate();

  const [downloadYear, setDownloadYear] = useState("2025");

  const handleDownloadYearChange = (e: SelectChangeEvent) => {
    setDownloadYear(e.target.value);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const { data, isSuccess } = useUserInfo(user.id);

  useEffect(() => {
    if (isSuccess) {
      setUserInfo(data.data);
    }
  }, [data]);

  const onClickFillDate = () => {
    setIsShowDatePopup((prev) => !prev);
  };

  const onFilterDate = async () => {
    setIsFiltering(true);
    setIsShowDatePopup(false);
    try {
      const res = await postJoinDate({
        joinDate: dayjs(dateValue).format("YYYY-MM-DD"),
      });
      if (res.success) {
        setDateFilter(dayjs(dateValue).format("YYYY-MM-DD"));
        setIsFiltering(false);
      }
    } catch (error: any) {
      const errorMessage = error.message ?? "Terjadi error, silakan coba lagi";

      setIsFiltering(false);
    }
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };
  console.log(chartYearly, "chartYearly");
  // Chart States
  const series = [
    {
      name: "Data",
      data: chartYearly?.data?.map((item) => item.total) as any,
    },
  ];
  const allData = chartYearly?.data.sort((a, b) => a.year - b.year); // oldest → newest

  const options: any = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: chartYearly?.data?.map((item) => item.year),
      min: (allData ?? [])?.length - 4, // show last 5 points initially
      max: allData?.length,
    },
    yaxis: {
      labels: {
        formatter: function (val: string) {
          return `${formatRupiah(Number(val))}`;
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return `${formatRupiah(Number(val))}`;
        },
      },
    },
  };

  // Chart States
  const seriesMonthly = [
    {
      name: "Data",
      data: chartSixMonth?.data?.map((item) => item.total) as any,
    },
  ];

  const optionsMonthly: any = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: chartSixMonth?.data?.map((item) => item.month),
    },
    yaxis: {
      labels: {
        formatter: function (val: string) {
          return `${formatRupiah(Number(val))}`;
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return `${formatRupiah(Number(val))}`;
        },
      },
    },
  };

  const onExpand = (index: number) => {
    if (!expandedCards[index]) {
      setExpandedCards({
        ...expandedCards,
        [index]: true,
      });
    } else {
      setExpandedCards({
        ...expandedCards,
        [index]: false,
      });
    }
  };

  const onClickDownloadSaldo = () => {
    setIsDownloadPopupOpen(true);
  };

  const onExportBalance = async () => {
    await window
      .fetch(
        `${API_URL}/v1/contribution/summary-detail-employee?empNo=${userInfo.nikEmployee}&year=${downloadYear}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${getSession()}`,
          },
        }
      )
      .then((res) =>
        res.json().then(async (res) => {
          try {
            const component = await import(
              "../../report/detail/detail-benefits"
            );
            const blob = await pdf(
              component.default({
                period: downloadYear,
                data: res.data,
              })
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `detail_${res?.data?.header?.nama_lengkap}_${downloadYear}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error("Error generating PDF:", error);
          }
        })
      ); // Generate PDF as blob
  };

  const joinYear = dayjs(userInfo?.dJoinDate).year();
  const currentYear = dayjs().year(); // get current year (e.g., 2025)

  // generate an array of years
  const years = Array.from(
    { length: currentYear - joinYear + 1 },
    (_, i) => joinYear + i
  );
  if (isFiltering) {
    return <AppLayout menuTitle="Dana Pensiun">{renderFallback}</AppLayout>;
  }

  return (
    <>
      <HomeTab />
      <Card
        sx={{
          mt: 3,
          py: 2,
          px: 3,
          bgcolor: "white",
          display: {
            position: "relative",
            xs: "none",
            md: "block",
          },
        }}
      >
        <Stack direction="row">
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              Nama
            </Typography>
            <Typography fontSize={16}>{userInfo.fullName}</Typography>
          </Stack>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              OPU
            </Typography>
            <Typography fontSize={16}>
              {userInfo?.opuDescription ?? "-"}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" mt={4}>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              No Gaji
            </Typography>
            <Typography fontSize={16}>{userInfo.nikEmployee}</Typography>
          </Stack>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              Tanggal Lahir
            </Typography>
            <Typography fontSize={16}>
              {dayjs(userInfo.birthDate).format("DD MMMM YYYY")}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" mt={4}>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              Tanggal Masuk DPIP
            </Typography>
            <Typography fontSize={16}>
              {userInfo.dJoinDate
                ? dayjs(userInfo.dJoinDate).format("DD MMMM YYYY")
                : "-"}
            </Typography>
          </Stack>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              Tanggal Masuk Kerja
            </Typography>
            <Typography fontSize={16}>
              {" "}
              {userInfo.joinDate
                ? dayjs(userInfo.joinDate).format("DD MMMM YYYY")
                : "-"}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" mt={4}>
          <Stack gap={1} width="50%">
            <Typography fontSize={16} fontWeight="bold">
              Sisa Masa Kerja
            </Typography>
            <Typography fontSize={16}>
              {/* 55 Tahun - usia */}
              {55 - dayjs().diff(dayjs(userInfo.birthDate), "year")} tahun
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Box
        sx={{
          width: "100%",
          mt: {
            xs: 0,
            md: 3,
          },
          p: { xs: 0, md: 2 }, // no padding on mobile, padding on desktop
          boxShadow: { xs: "none", md: 3 }, // no shadow on mobile, shadow on desktop
          borderRadius: { xs: 0, md: 2 }, // optional: rounded only on desktop
          backgroundColor: "background.paper",
        }}
      >
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="dana pensiun tab"
              TabIndicatorProps={{ style: { display: "none" } }} // hide default underline
            >
              <Tab
                sx={{
                  width: "50%",
                  color: "gray",
                  "&.Mui-selected": {
                    color: "blue.500",
                    borderBottom: "2px solid #4AA1F3",
                  },
                }}
                label="Tahun"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  width: "50%",
                  color: "gray",
                  "&.Mui-selected": {
                    color: "blue.500",
                    borderBottom: "2px solid #4AA1F3",
                  },
                }}
                label="Bulan"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          {/* Tab Tahunan */}
          <TabPanel value={0} sx={{ px: 0 }}>
            <Box>
              {/* <Typography>Dana Pensiun {"(2019 - 2025)"}</Typography> */}
              <Typography fontWeight="bold" fontSize={24}>
                {formatRupiah(amountSummary?.totalSaldo ?? 0)}
              </Typography>
              <Box mt={2}>
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={300}
                />
              </Box>
              <Box mt={4}>
                <Card
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography fontWeight="bold">Info Bulanan</Typography>
                  <Stack mt={2} gap={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                      borderBottom="1px solid #EFF1F5"
                      pb={2}
                    >
                      <Typography sx={{ color: "grey.500" }}>
                        Saldo Akhir {infoMonthly?.previousYear}
                      </Typography>
                      <Typography fontWeight="bold">
                        {formatRupiah(infoMonthly?.previousYearAmount ?? 0)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                      borderBottom="1px solid #EFF1F5"
                      pb={2}
                    >
                      <Typography sx={{ color: "grey.500" }}>
                        Saldo {infoMonthly?.currentYear}
                      </Typography>
                      <Typography fontWeight="bold">
                        {formatRupiah(infoMonthly?.currentYearAmount ?? 0)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography sx={{ color: "grey.500" }}>Total</Typography>
                      <Typography fontWeight="bold">
                        {formatRupiah(infoMonthly?.total ?? 0)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Box>
              <Box mt={4}>
                <Typography fontWeight="bold">Riwayat Transaksi</Typography>
                <Stack mt={2} gap={2}>
                  {historyYearly?.map(({ total, period, year }) => (
                    <Card
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Stack justifyContent="space-between" width="100%">
                        <Typography fontWeight="bold">{year}</Typography>
                        <Typography>{period}</Typography>
                      </Stack>
                      <Typography sx={{ color: "#0FBD66" }} fontWeight="bold">
                        {formatRupiah(total)}
                      </Typography>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Box>
          </TabPanel>

          {/* Tab Bulanan */}
          <TabPanel value={1} sx={{ px: 0 }}>
            <Box>
              {" "}
              <FormControl fullWidth>
                <InputLabel
                  shrink={false}
                  id="select-label"
                  style={{ display: "none" }}
                ></InputLabel>
                <Select
                  labelId="select-label"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  displayEmpty
                  sx={{ mb: 4 }}
                >
                  {years
                    .map((year) => (
                      <MenuItem key={year} value={String(year)}>
                        {year}
                      </MenuItem>
                    ))
                    .reverse()}
                </Select>
              </FormControl>
              {/* <Typography>Dana Pensiun {"(2019 - 2025)"}</Typography> */}
              <Typography fontWeight="bold" fontSize={24}>
                {formatRupiah(chartSixMonth?.total ?? 0)}
              </Typography>
              <Box mt={2}>
                <Chart
                  options={optionsMonthly}
                  series={seriesMonthly}
                  type="area"
                  height={300}
                />
              </Box>
              <Box mt={4}>
                <Typography fontWeight="bold">Riwayat Transaksi</Typography>
                <Stack mt={2} gap={2}>
                  {transactionHistory?.data?.map(
                    ({ month, date, details, total }, index) => (
                      <Card
                        sx={{
                          p: 2,
                          // display: "flex",
                          // alignItems: "center",
                        }}
                        onClick={() => onExpand(index)}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Stack justifyContent="space-between">
                            <Typography fontWeight="bold">
                              {dayjs(date).format("YYYY")}
                            </Typography>
                            <Typography>{month}</Typography>
                          </Stack>
                          <Stack gap={2} direction="row" alignItems="center">
                            <Typography
                              sx={{ color: "#0FBD66" }}
                              fontWeight="bold"
                            >
                              {formatRupiah(total)}
                            </Typography>

                            <Box
                              component="img"
                              src="/images/icons/chevron-down.svg"
                              width={12}
                              height={12}
                              sx={{
                                transform: expandedCards[index]
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transitionProperty: "all",
                                transitionDuration: 10,
                              }}
                            />
                          </Stack>
                        </Stack>
                        <Collapse
                          in={expandedCards[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent sx={{ p: 0 }}>
                            <Box
                              sx={{
                                width: "100%",
                                borderBottomWidth: 2,
                                borderBottomColor: "#D1D6E0",
                                borderBottomStyle: "dashed",
                                pb: 2,
                              }}
                            />
                            <Stack mt={2} gap={2}>
                              {details?.map((detail) => (
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography>{detail?.description}</Typography>
                                  <Typography fontWeight="bold">
                                    {formatRupiah(detail?.amount)}
                                  </Typography>
                                </Stack>
                              ))}
                            </Stack>
                          </CardContent>
                        </Collapse>
                      </Card>
                    )
                  )}
                </Stack>
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>

      <Box
        sx={{
          position: "sticky", // float inside parent scroll area
          bottom: 0, // stick to bottom of parent box
          bgcolor: "white", // white background
          width: "100%", // match parent width
          p: 2, // padding around button
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)", // subtle top shadow
          borderTop: "1px solid #eee",
          display: "none", // hide temporary request by product
          justifyContent: "center",
          zIndex: 10,
          mt: 4,
          borderRadius: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClickDownloadSaldo}
          sx={{
            width: "80%",
            borderRadius: "50px",
            px: 3,
            py: 1.5,
            borderColor: "blue.500",
            color: "blue.500",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/images/icons/download.svg"
            width={20}
            height={20}
          />
          Unduh Saldo Manfaat
        </Button>
      </Box>

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

      <Drawer
        anchor="bottom"
        open={isDownloadPopupOpen}
        onClose={() => setIsDownloadPopupOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 2,
            pb: 4,
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            sx={{
              bgcolor: "#79747E",
              width: 32,
              borderRadius: "100px",
              height: 5,
              margin: "auto",
            }}
          />
          <Typography variant="h6" align="center">
            Unduh Saldo Manfaat
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            Pilih tahun dan jenis laporan yang ingin Anda unduh untuk personal
            balance <strong>{userInfo.fullName}</strong>
          </Typography>

          <Typography variant="subtitle2">Tahun</Typography>
          <Select
            fullWidth
            value={downloadYear}
            onChange={handleDownloadYearChange}
            size="small"
          >
            {years
              .map((year) => (
                <MenuItem key={year} value={String(year)}>
                  {year}
                </MenuItem>
              ))
              .reverse()}
          </Select>

          <Box display="flex" gap={2} mt={2}>
            <Button
              onClick={() => setIsDownloadPopupOpen(false)}
              fullWidth
              variant="outlined"
              size="large"
              type="submit"
              sx={{
                margin: "auto",
                borderRadius: 3,
                py: 1.5,
                color: "blue.500",
                borderColor: "blue.500",
              }}
            >
              Kembali ke Beranda
            </Button>
            <Button
              onClick={onExportBalance}
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                margin: "auto",
                borderRadius: 3,
                py: 1.5,
                backgroundColor: "blue.500",
              }}
            >
              Unduh
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
