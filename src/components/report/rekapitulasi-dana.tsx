import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Font,
  Image,
} from "@react-pdf/renderer";
import PoppinsRegular from "../../../public/fonts/Poppins-Regular.ttf";
import PoppinsBold from "../../../public/fonts/Poppins-Bold.ttf";
import logo from "../../../public/images/dpip.png";
Font.register({
  family: "Poppins",
  fonts: [
    { src: PoppinsRegular, fontWeight: "normal" },
    { src: PoppinsBold, fontWeight: "bold" },
  ],
});
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 7,
    fontFamily: "Poppins",
  },
  header: {
    textAlign: "left",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 2,
  },
  table: {
    display: "flex",
    width: "100%",

    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
  },
  tableColSmall: {
    width: "4%",

    padding: 3,
  },
  tableColWide: {
    width: "15%",

    padding: 3,
  },
  tableColMoney: {
    width: "7%",

    padding: 3,
  },
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: 7,
  },
  tableCell: {
    fontSize: 7,
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
});

// Example data
const participants = [
  {
    no: 1,
    name: "Andi Saputra",
    noPeserta: "0012931742",
    saldoAwal: "Rp.0",
    saldoBulanan: Array(12).fill("Rp.0"),
    saldoAkhir: "Rp.0",
  },
  {
    no: 2,
    name: "Joko Susanto",
    noPeserta: "0012931742",
    saldoAwal: "Rp.1.000.020",
    saldoBulanan: Array(12).fill("Rp.1.000.020"),
    saldoAkhir: "Rp.1.000.020",
  },
];

// PDF Document
const RekapitulasiPensiunReport: React.FC = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
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
          <Text style={styles.title}>Rekapitulasi Dana Pensiun Peserta</Text>
          <Text style={styles.subtitle}>Dana Pensiun Iuran Pasti Bogasari</Text>
          <Text style={styles.subtitle}>
            Periode: 2025 | Status: Aktif | OPU: Bogasari Pasta JKT
          </Text>{" "}
        </View>

        {/* Right side: logo */}
        <Image
          src={logo}
          style={{ width: 50, height: 74 }} // adjust size as needed
        />
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColSmall}>
            <Text style={styles.tableCellHeader}>No</Text>
          </View>
          <View style={styles.tableColWide}>
            <Text style={styles.tableCellHeader}>Nama & No Peserta</Text>
          </View>
          <View style={styles.tableColMoney}>
            <Text style={styles.tableCellHeader}>Saldo Awal</Text>
          </View>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ].map((m) => (
            <View key={m} style={styles.tableColMoney}>
              <Text style={styles.tableCellHeader}>{m}</Text>
            </View>
          ))}
          <View style={styles.tableColMoney}>
            <Text style={styles.tableCellHeader}>Saldo Akhir</Text>
          </View>
        </View>

        {/* Table Rows */}
        {participants.map((p, idx) => (
          <View
            key={p.no}
            style={{
              ...styles.tableRow,
              backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f0f0f0",
            }}
          >
            <View style={styles.tableColSmall}>
              <Text style={styles.tableCell}>{p.no}</Text>
            </View>
            <View style={styles.tableColWide}>
              <Text style={styles.tableCell}>
                {p.name}
                {"\n"}
                {p.noPeserta}
              </Text>
            </View>
            <View style={styles.tableColMoney}>
              <Text style={styles.tableCell}>{p.saldoAwal}</Text>
            </View>
            {p.saldoBulanan.map((val, idx) => (
              <View key={idx} style={styles.tableColMoney}>
                <Text style={styles.tableCell}>{val}</Text>
              </View>
            ))}
            <View style={styles.tableColMoney}>
              <Text style={styles.tableCell}>{p.saldoAkhir}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Summary Section (before footer) */}
      <View style={{ marginTop: 20, marginBottom: 40 }}>
        <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 6 }}>
          Semua Ringkasan
        </Text>

        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <Text style={{ width: "20%" }}>Total OPU</Text>
          <Text>: 20</Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <Text style={{ width: "20%" }}>Total Saldo Awal</Text>
          <Text>: Rp3.098.048</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: "20%" }}>Total Saldo Akhir</Text>
          <Text>: Rp1.032.000</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Left */}
        <Text>
          <Text style={{ fontWeight: "bold" }}>Iuran Pasti Bogasari{"\n"}</Text>
          Jl. Raya Cilincing No.1 - Tanjung Priok, Jakarta Utara
        </Text>

        {/* Center */}
        <Text>
          <Text style={{ fontWeight: "bold" }}>Printed Date{"\n"}</Text>
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          ,{" "}
          {new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}{" "}
          WIB
        </Text>

        {/* Right */}
        <Text>
          <Text style={{ fontWeight: "bold" }}>Halaman{"\n"}</Text>
          1/3
        </Text>
      </View>
    </Page>
  </Document>
);

export default RekapitulasiPensiunReport;
