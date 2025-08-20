import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles: any = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
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
    fontSize: 9,
  },
  value: {
    fontSize: 9,
    fontWeight: "bold",
  },
  table: {
    display: "table" as unknown as any,
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "14.2%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 4,
    fontSize: 9,
    fontWeight: "bold",
  },
  tableCol: {
    width: "14.2%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 9,
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

// Data types
interface Contribution {
  bulan: string;
  keterangan: string;
  iuranPeserta: string;
  iuranPerusahaan: string;
  hasil: string;
  pencairan: string;
  total: string;
}

// Mock Data (replace with props or API data)
const contributions: Contribution[] = [
  {
    bulan: "Jan 2025",
    keterangan: "Transaksi Januari 2025",
    iuranPeserta: "Rp500.000",
    iuranPerusahaan: "Rp500.000",
    hasil: "Rp50.000",
    pencairan: "Rp0",
    total: "Rp1.050.000",
  },
];

const summary = [
  { label: "Saldo Awal", value: "Rp0" },
  { label: "Saldo Iuran Peserta", value: "Rp6.000.000" },
  { label: "Saldo Iuran Perusahaan", value: "Rp6.000.000" },
  { label: "Total Pengembangan", value: "Rp0" },
  { label: "Total Pencairan", value: "Rp0" },
  { label: "Total Saldo Akhir", value: "Rp6.000.000" },
];

const SaldoManfaatPDF: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Saldo Manfaat</Text>
        <Text> Dana Pensiun Iuran Pasti Bogasari </Text>
        <Text> Periode: 2025 </Text>
      </View>

      {/* Personal Info in 3 Columns */}
      <View style={styles.infoSection}>
        {/* Column 1 */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>Indah Sari</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <Text style={styles.value}>12 Juni 1990</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tanggal Mulai Bekerja</Text>
            <Text style={styles.value}>01 Maret 2002</Text>
          </View>
        </View>

        {/* Column 2 */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nomor Karyawan</Text>
            <Text style={styles.value}>ID0012834</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>OPU</Text>
            <Text style={styles.value}>Bogasari Pasta JKT</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tanggal Bergabung DPIP</Text>
            <Text style={styles.value}>01 Maret 2002</Text>
          </View>
        </View>

        {/* Column 3 */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>NIP/NIK</Text>
            <Text style={styles.value}>148904948494039434</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Job Class</Text>
            <Text style={styles.value}>Asisten Manager</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status Peserta</Text>
            <Text style={styles.statusActive}>Aktif</Text>
          </View>
        </View>
      </View>

      {/* Contribution Summary */}
      <Text style={styles.sectionTitle}>
        Riwayat Kontribusi Bulanan - Summary
      </Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>No</Text>
          <Text style={styles.tableColHeader}>Bulan</Text>
          <Text style={styles.tableColHeader}>Keterangan</Text>
          <Text style={styles.tableColHeader}>Iuran Peserta</Text>
          <Text style={styles.tableColHeader}>Iuran Perusahaan</Text>
          <Text style={styles.tableColHeader}>Hasil Pengembangan</Text>
          <Text style={styles.tableColHeader}>Pencairan</Text>
          <Text style={styles.tableColHeader}>Total Bulanan</Text>
        </View>

        {/* Table Rows */}
        {contributions.map((c, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableCol}>{i + 1}</Text>
            <Text style={styles.tableCol}>{c.bulan}</Text>
            <Text style={styles.tableCol}>{c.keterangan}</Text>
            <Text style={styles.tableCol}>{c.iuranPeserta}</Text>
            <Text style={styles.tableCol}>{c.iuranPerusahaan}</Text>
            <Text style={styles.tableCol}>{c.hasil}</Text>
            <Text style={styles.tableCol}>{c.pencairan}</Text>
            <Text style={styles.tableCol}>{c.total}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Iuran Pasti Bogasari - Jl. Raya Cilincing No.1, Tanjung Priok, Jakarta
          Utara
        </Text>
        <Text>Printed Date: 19 Agustus 2025 | Halaman 1/2</Text>
      </View>
    </Page>
    {/* Page 2 */}
    <Page size="A4" orientation="portrait" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Saldo Manfaat</Text>
        <Text> Dana Pensiun Iuran Pasti Bogasari </Text>
        <Text> Periode: 2025 </Text>
      </View>

      {/* Summary */}
      <Text style={[styles.title, { fontSize: 12, marginBottom: 12 }]}>
        Ringkasan Saldo Dana Pensiun
      </Text>
      {summary.map((s, idx) => (
        <View style={styles.summaryRow} key={idx}>
          <Text>{s.label}</Text>
          <Text style={idx === summary.length - 1 ? styles.bold : {}}>
            {s.value}
          </Text>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Iuran Pasti Bogasari - Jl. Raya Cilincing No.1, Tanjung Priok, Jakarta
          Utara
        </Text>
        <Text>Printed Date: 19 Agustus 2025 | Halaman 2/2</Text>
      </View>
    </Page>
  </Document>
);

export default SaldoManfaatPDF;
