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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AppLayout } from "../../layouts/layout";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import Chart from "react-apexcharts";
import { TabContext, TabPanel } from "@mui/lab";
import { useInfoMonthly } from "../../services/dana-pensiun/use-info-monthly";
import { formatRupiah } from "../../utils/format-rupiah";
import { useHistoryYearly } from "../../services/dana-pensiun/use-history-yearly";
import { useAmountSummary } from "../../services/dana-pensiun/use-amount-summary";
import { useChartYearly } from "../../services/dana-pensiun/use-chart-yearly";
import { useChartSixMonth } from "../../services/dana-pensiun/use-chart-six-month";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const transactionHistories = [
  {
    year: "2025",
    periodRange: "Jan - Jun",
    amount: "Rp5.673.455",
  },
  {
    year: "2024",
    periodRange: "Aug - Jan",
    amount: "Rp15.673.455",
  },
  {
    year: "2024",
    periodRange: "Mar - Aug",
    amount: "Rp8.673.455",
  },
];

export function DanaPensiunView() {
  // const { data: historyYearly } = useHistoryYearly();
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [isShowDatePopup, setIsShowDatePopup] = useState(false);
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [yearFilter, setYearFilter] = useState("2025");
  const [tabIndex, setTabIndex] = React.useState(0);
  const [expandedCards, setExpandedCards] = React.useState<
    Record<number, boolean>
  >({});

  const { data: infoMonthly } = useInfoMonthly();
  const { data: amountSummary } = useAmountSummary();
  const { data: chartYearly } = useChartYearly();
  const { data: chartSixMonth } = useChartSixMonth(yearFilter);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

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

  // Chart States
  const series = [
    {
      name: "Data",
      data: chartYearly?.data?.map((item) => item.total) as any,
    },
  ];

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
      categories: chartYearly?.data?.map((item) => item.month),
    },
    yaxis: {
      labels: {
        formatter: function (val: string) {
          return `${val}jt`;
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
          return `${val}jt`;
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
          return `${val}jt`;
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
          return `${val}jt`;
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

  console.log(expandedCards, "expandedCards");
  return (
    <AppLayout menuTitle="Dana Pensiun">
      {dateFilter !== null ? (
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
        <Box sx={{ width: "100%" }}>
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
                <Typography>Dana Pensiun {"(2019 - 2025)"}</Typography>
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
                        <Typography sx={{ color: "grey.500" }}>
                          Total
                        </Typography>
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
                    {transactionHistories?.map(
                      ({ amount, periodRange, year }) => (
                        <Card
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Stack justifyContent="space-between" width="100%">
                            <Typography fontWeight="bold">{year}</Typography>
                            <Typography>{periodRange}</Typography>
                          </Stack>
                          <Typography
                            sx={{ color: "#0FBD66" }}
                            fontWeight="bold"
                          >
                            {amount}
                          </Typography>
                        </Card>
                      )
                    )}
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
                    <MenuItem value="2025">Tahun 2025</MenuItem>
                    <MenuItem value="2024">Tahun 2024</MenuItem>
                    <MenuItem value="2023">Tahun 2023</MenuItem>
                    <MenuItem value="2022">Tahun 2022</MenuItem>
                    <MenuItem value="2021">Tahun 2021</MenuItem>
                  </Select>
                </FormControl>
                <Typography>Dana Pensiun {"(2019 - 2025)"}</Typography>
                <Typography fontWeight="bold" fontSize={24}>
                  Rp850.750.000
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
                    {transactionHistories?.map(
                      ({ amount, periodRange, year }, index) => (
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
                              <Typography fontWeight="bold">{year}</Typography>
                              <Typography>{periodRange}</Typography>
                            </Stack>
                            <Stack gap={2} direction="row" alignItems="center">
                              <Typography
                                sx={{ color: "#0FBD66" }}
                                fontWeight="bold"
                              >
                                {amount}
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
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography>Kontribusi iuran 2,5%</Typography>
                                  <Typography fontWeight="bold">
                                    Rp250.000
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography>
                                    Kontribusi perusahaan 10%
                                  </Typography>
                                  <Typography fontWeight="bold">
                                    Rp1.250.000
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography>Hasil Pengembangan</Typography>
                                  <Typography fontWeight="bold">
                                    Rp550.000
                                  </Typography>
                                </Stack>
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
