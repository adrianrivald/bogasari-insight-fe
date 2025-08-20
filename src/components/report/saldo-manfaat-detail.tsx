import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Constants
const ROW_HEIGHT = 18; // adjust this to match desired row height (px-ish)

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
    // don't set fixed height here for grouped rows; we keep it per-cell for flexibility
  },
  tableColHeader: {
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

  // styles for the "spanning" cell
  rowspanCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 9,
    // we'll set height dynamically when rendering
  },

  // placeholder cell for rows that are part of a span but not the first: we render a
  // zero-height or borderless cell to keep columns aligned if desired
  placeholderCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 9,
    // hide text; borders can be adjusted if you want a perfect seamless border
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
interface ContributionDetail {
  no?: string;
  bulanOPU: string;
  keterangan: string;
  kode: string;
  mutasi: string;
  dk: string;
  hp: string;
  saldo: string;
}

// Example data (replace with props or API data)
const contributionDetails: ContributionDetail[] = [
  {
    no: "1",
    bulanOPU: "Januari 2025 - Jakarta-CG",
    keterangan: "Kontribusi Peserta Kon-DBI-2025289-248972982",
    kode: "01",
    mutasi: "Rp179.078",
    dk: "K",
    hp: "-",
    saldo: "Rp179.078",
  },
  {
    no: "",
    bulanOPU: "Januari 2025 - Jakarta-CG",
    keterangan: "Kontribusi Perusahaan [NoTransaksi]",
    kode: "01",
    mutasi: "Rp500.000",
    dk: "K",
    hp: "-",
    saldo: "Rp179.078",
  },
  {
    no: "1",
    bulanOPU: "Februari 2025 - Jakarta-CG",
    keterangan: "Hasil Pengembangan [NoTransaksi]",
    kode: "02",
    mutasi: "Rp500.000",
    dk: "K",
    hp: "-",
    saldo: "Rp179.078",
  },
  {
    no: "2",
    bulanOPU: "Maret 2025 - Jakarta-CG",
    keterangan: "Pencairan [NoTransaksi]",
    kode: "03",
    mutasi: "Rp500.000",
    dk: "K",
    hp: "0.6%",
    saldo: "Rp179.078",
  },
];

// Helper to compute groups and mark first-in-group with count
type RowWithSpan = ContributionDetail & {
  isFirstOfGroup: boolean;
  groupSize: number;
};

const computeRowSpans = (rows: ContributionDetail[]): RowWithSpan[] => {
  const out: RowWithSpan[] = [];
  let i = 0;
  while (i < rows.length) {
    const currentKey = rows[i].bulanOPU || "";
    // count how many consecutive rows have same bulanOPU
    let j = i + 1;
    while (j < rows.length && (rows[j].bulanOPU || "") === currentKey) j++;
    const groupSize = j - i;
    for (let k = i; k < j; k++) {
      out.push({
        ...rows[k],
        isFirstOfGroup: k === i,
        groupSize,
      });
    }
    i = j;
  }
  return out;
};

const summary = [
  { label: "Saldo Awal", value: "Rp0" },
  { label: "Saldo Iuran Peserta", value: "Rp6.000.000" },
  { label: "Saldo Iuran Perusahaan", value: "Rp6.000.000" },
  { label: "Total Pengembangan", value: "Rp0" },
  { label: "Total Pencairan", value: "Rp0" },
  { label: "Total Saldo Akhir", value: "Rp6.000.000" },
];

const SaldoManfaatDetailPDF: React.FC = () => {
  const rowsWithSpans = computeRowSpans(contributionDetails);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Saldo Manfaat
          </Text>
          <Text> Dana Pensiun Iuran Pasti Bogasari </Text>
          <Text> Periode: 2025 </Text>
        </View>

        {/* Personal Info in 3 Columns */}
        <View style={styles.infoSection}>
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

        {/* Contribution Detail Table */}
        <Text style={styles.sectionTitle}>
          Riwayat Kontribusi Bulanan - Detail
        </Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableColHeader, { width: "5%" }]}>No</Text>
            <Text style={[styles.tableColHeader, { width: "20%" }]}>
              Bulan & OPU - Job Class
            </Text>
            <Text style={[styles.tableColHeader, { width: "30%" }]}>
              Keterangan
            </Text>
            <Text style={[styles.tableColHeader, { width: "8%" }]}>Kode</Text>
            <Text style={[styles.tableColHeader, { width: "12%" }]}>
              Mutasi
            </Text>
            <Text style={[styles.tableColHeader, { width: "5%" }]}>D/K</Text>
            <Text style={[styles.tableColHeader, { width: "10%" }]}>
              HP (%)
            </Text>
            <Text style={[styles.tableColHeader, { width: "10%" }]}>Saldo</Text>
          </View>

          {/* Table Rows with simulated rowspan */}
          {rowsWithSpans.map((r, idx) => {
            // compute height for a normal row and for the rowspan cell
            const normalRowHeight = ROW_HEIGHT;
            const rowspanHeight = r.isFirstOfGroup
              ? ROW_HEIGHT * r.groupSize
              : undefined;

            return (
              <View key={idx} style={styles.tableRow}>
                {/* No */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "5%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.no}
                </Text>

                {/* Bulan & OPU - simulate rowspan by rendering only on first row with increased height */}
                {r.isFirstOfGroup ? (
                  <Text
                    style={[
                      styles.rowspanCell,
                      {
                        width: "20%",
                        height: rowspanHeight,
                        minHeight: ROW_HEIGHT,
                      },
                    ]}
                  >
                    {r.bulanOPU}
                  </Text>
                ) : (
                  // Option: render an empty placeholder to keep column widths; tweak borderTopWidth if needed
                  <Text
                    style={[
                      styles.placeholderCell,
                      { width: "20%", minHeight: normalRowHeight },
                    ]}
                  >
                    {/* empty for visual rowspan */}
                  </Text>
                )}

                {/* Keterangan */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "30%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.keterangan}
                </Text>

                {/* Kode */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "8%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.kode}
                </Text>

                {/* Mutasi */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "12%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.mutasi}
                </Text>

                {/* D/K */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "5%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.dk}
                </Text>

                {/* HP */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "10%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.hp}
                </Text>

                {/* Saldo */}
                <Text
                  style={[
                    styles.tableCol,
                    { width: "10%", minHeight: normalRowHeight },
                  ]}
                >
                  {r.saldo}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Summary */}
        <Text
          style={[
            styles.title,
            { fontSize: 12, marginTop: 48, marginBottom: 12 },
          ]}
        >
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
            Iuran Pasti Bogasari - Jl. Raya Cilincing No.1, Tanjung Priok,
            Jakarta Utara
          </Text>
          <Text>Printed Date: 19 Agustus 2025 | Halaman 2/2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SaldoManfaatDetailPDF;
