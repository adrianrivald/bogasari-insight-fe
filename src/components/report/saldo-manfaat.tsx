import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import PoppinsRegular from "../../../public/fonts/Poppins-Regular.ttf";
import logo from "../../../public/images/dpip.png";

Font.register({
  family: "Poppins",
  src: PoppinsRegular,
});

// Styles (same as before, kept unchanged)
const styles: any = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Poppins",
  },
  header: {
    textAlign: "left",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoColumn: {
    width: "32%",
  },
  infoRow: {
    marginBottom: 6,
  },
  label: {
    fontSize: 8,
  },
  value: {
    fontSize: 8,
    fontWeight: "bold",
  },
  table: {
    display: "table" as unknown as any,
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "15.8333%",
    backgroundColor: "#f0f0f0",
    padding: 4,
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCol: {
    width: "15.8333%",
    padding: 4,
    fontSize: 8,
  },
  statusActive: {
    color: "green",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});

// Types
interface MonthlyData {
  no: number;
  bulan: string;
  keterangan: string;
  iuranPeserta: number;
  iuranPerusahaan: number;
  hasilPengembangan: number;
  pencairan: number;
}

interface YearlyData {
  year: number;
  monthlyData: MonthlyData[];
  totals: {
    totalIuranPeserta: number;
    totalIuranPerusahaan: number;
    totalHasilPengembangan: number;
    totalPencairan: number;
    totalSaldo: number;
  };
}

interface Props {
  data: YearlyData[];
  userInfo: any;
}

// Utility for formatting currency
const formatRupiah = (val: number) => "Rp" + val.toLocaleString("id-ID");

// Component
const SaldoManfaatPDF: React.FC<Props> = ({ data, userInfo }) => (
  <Document>
    {data.map((yearData, index) => (
      <React.Fragment key={yearData.year}>
        {/* PAGE 1: Monthly Transactions */}
        <Page size="A4" style={styles.page}>
          <View
            style={{
              ...styles.header,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left side: text */}
            <View>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Saldo Manfaat
              </Text>
              <Text> Dana Pensiun Iuran Pasti Bogasari </Text>
              <Text> Periode: {yearData.year} </Text>
            </View>

            {/* Right side: logo */}
            <Image
              src={logo}
              style={{ width: 50, height: 74 }} // adjust size as needed
            />
          </View>

          {/* Personal Info */}
          <View style={styles.infoSection}>
            {/* Column 1 */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.fullName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Tanggal Lahir</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {dayjs(userInfo.birthDate).format("DD MMMM YYYY")}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Tanggal Mulai Bekerja</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.joinDate
                    ? dayjs(userInfo.joinDate).format("DD MMMM YYYY")
                    : "-"}
                </Text>
              </View>
            </View>

            {/* Column 2 */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nomor Karyawan</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.nikEmployee}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>OPU</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo?.opuCode ?? "-"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Tanggal Bergabung DPIP</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.dJoinDate
                    ? dayjs(userInfo.dJoinDate).format("DD MMMM YYYY")
                    : "-"}
                </Text>
              </View>
            </View>

            {/* Column 3 */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>NIP/NIK</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.noKtp}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Job Class</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  {userInfo.role}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Status Peserta</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>
                  Aktif
                </Text>
              </View>
            </View>
          </View>

          {/* Contribution Summary Table */}
          <Text style={{ ...styles.sectionTitle, fontWeight: "bold" }}>
            Riwayat Kontribusi Bulanan - {yearData.year}
          </Text>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.tableColHeader,
                  width: "5%",
                  textAlign: "center",
                }}
              >
                No
              </Text>
              <Text style={styles.tableColHeader}>Keterangan</Text>
              <Text style={{ ...styles.tableColHeader, textAlign: "right" }}>
                Iuran Peserta
              </Text>
              <Text style={{ ...styles.tableColHeader, textAlign: "right" }}>
                Iuran Perusahaan
              </Text>
              <Text style={{ ...styles.tableColHeader, textAlign: "right" }}>
                Hasil Pengembangan
              </Text>
              <Text style={{ ...styles.tableColHeader, textAlign: "right" }}>
                Pencairan
              </Text>
              <Text style={{ ...styles.tableColHeader, textAlign: "right" }}>
                Total Bulanan
              </Text>
            </View>

            {/* Table Rows */}
            {yearData.monthlyData.map((c, idx) => {
              const total =
                c.iuranPeserta +
                c.iuranPerusahaan +
                c.hasilPengembangan -
                c.pencairan;
              return (
                <View
                  key={c.no}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f0f0f0",
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableCol,
                      width: "5%",
                      textAlign: "center",
                    }}
                  >
                    {c.no}
                  </Text>
                  <Text style={styles.tableCol}>{c.keterangan}</Text>
                  <Text style={{ ...styles.tableCol, textAlign: "right" }}>
                    {formatRupiah(c.iuranPeserta)}
                  </Text>
                  <Text style={{ ...styles.tableCol, textAlign: "right" }}>
                    {formatRupiah(c.iuranPerusahaan)}
                  </Text>
                  <Text style={{ ...styles.tableCol, textAlign: "right" }}>
                    {formatRupiah(c.hasilPengembangan)}
                  </Text>
                  <Text style={{ ...styles.tableCol, textAlign: "right" }}>
                    {formatRupiah(c.pencairan)}
                  </Text>

                  <Text style={{ ...styles.tableCol, textAlign: "right" }}>
                    {formatRupiah(total)}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={{ fontSize: 12, marginTop: 16 }}>
            Ringkasan Saldo Dana Pensiun
          </Text>

          <View style={styles.summaryRow}>
            <Text>Saldo Iuran Peserta</Text>
            <Text>{formatRupiah(yearData.totals.totalIuranPeserta)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Saldo Iuran Perusahaan</Text>
            <Text>{formatRupiah(yearData.totals.totalIuranPerusahaan)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Total Pengembangan</Text>
            <Text>{formatRupiah(yearData.totals.totalHasilPengembangan)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Total Pencairan</Text>
            <Text>{formatRupiah(yearData.totals.totalPencairan)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ fontWeight: "bold" }}>Total Saldo Akhir</Text>
            <Text style={{ fontWeight: "bold" }}>
              {formatRupiah(yearData.totals.totalSaldo)}
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>
              Iuran Pasti Bogasari - Jl. Raya Cilincing No.1, Tanjung Priok,
              Jakarta Utara
            </Text>
            <Text>
              Printed Date: {new Date().toLocaleDateString("id-ID")} | Halaman
              1/1
            </Text>
          </View>
        </Page>
      </React.Fragment>
    ))}
  </Document>
);

export default SaldoManfaatPDF;
