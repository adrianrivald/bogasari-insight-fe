import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 7,
    fontFamily: "Helvetica",
  },
  header: {
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
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColSmall: {
    width: "4%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  tableColWide: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  tableColMoney: {
    width: "7%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: 7,
  },
  tableCell: {
    fontSize: 7,
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rekapitulasi Dana Pensiun Peserta</Text>
        <Text style={styles.subtitle}>Dana Pensiun Iuran Pasti Bogasari</Text>
        <Text style={styles.subtitle}>
          Periode: 2025 | Status: Aktif | OPU: Bogasari Pasta JKT
        </Text>
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
        {participants.map((p) => (
          <View key={p.no} style={styles.tableRow}>
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
    </Page>
  </Document>
);

export default RekapitulasiPensiunReport;
