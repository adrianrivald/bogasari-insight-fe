"use client";

import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Table, TH, TD, TR } from "@ag-media/react-pdf-table";
import { PdfHeader, PdfFooter } from "./layout";
import DetailEmployee from "./detail-employee";
import BalanceSummary from "./balance-summary";
import type { SummaryBenefit } from "@/types/api";
import {
  flexBoxStyles,
  layoutStyles,
  tableStyles,
  textStyles,
} from "./style-sheet";
import { formatIDR } from "@/lib/utils";

const DETAIL_EMPLOYEE = [
  {
    key: "nama_lengkap",
    label: "Nama Lengkap",
  },
  {
    key: "nomor_karyawan",
    label: "Nomor Karyawan",
  },
  {
    key: "nip_nik",
    label: "NIP/NIK",
  },
  {
    key: "tanggal_lahir",
    label: "Tanggal Lahir",
  },
  {
    key: "opu",
    label: "OPU",
  },
  {
    key: "job_class",
    label: "Jabatan",
  },
  {
    key: "tanggal_mulai_bekerja",
    label: "Tanggal Mulai Bekerja",
  },
  {
    key: "tanggal_bergabung_dpip",
    label: "Tanggal Bergabung DPIP",
  },
  {
    key: "status_peserta",
    label: "Status Peserta",
  },
];
const BALANCE_SUMMARY = [
  {
    key: "saldo_awal",
    label: "Saldo Awal",
    currency: true,
  },
  {
    key: "total_iuran_peserta",
    label: "Saldo Iuran Peserta",
    currency: true,
  },
  {
    key: "total_iuran_perusahaan",
    label: "Saldo Iuran Perusahaan",
    currency: true,
  },
  {
    key: "total_hasil_pengembangan",
    label: "Hasil Pengembangan",
    currency: true,
  },
  {
    key: "total_pencairan",
    label: "Total Pencairan",
    currency: true,
  },
  {
    key: "saldo_akhir",
    label: "Total Saldo Akhir",
    currency: true,
  },
];

export default function SummaryBenefits({
  data,
  period,
}: {
  data?: SummaryBenefit["data"];
  period: string;
}) {
  return (
    <Document author="DPIP" creator="DPIP">
      <Page size="A4" orientation="portrait" style={layoutStyles.page}>
        <PdfHeader title="Saldo Manfaat" period={period} />
        {data && (
          <>
            <DetailEmployee list={DETAIL_EMPLOYEE} data={data.header} />
            <View style={layoutStyles.main}>
              <Text style={[textStyles.sm, textStyles.semiBold]}>
                Riwayat Kontribusi Bulanan - Summary
              </Text>
              <Table
                style={[textStyles.xxs]}
                tdStyle={tableStyles.cell}
                weightings={[0.025]}
              >
                <TH fixed style={[textStyles.bold, tableStyles.rowEven]}>
                  <TD style={flexBoxStyles.justifyCenter}>No</TD>
                  <TD>Bulan</TD>
                  <TD>Keterangan</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Iuran Peserta</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Iuran Perusahaan</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Hasil Pengembangan</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Pencairan</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Total Bulanan</TD>
                </TH>
                {data.content.map((item, index) => (
                  <TR
                    key={index}
                    style={[
                      textStyles.medium,
                      index % 2 ? tableStyles.rowEven : tableStyles.rowOdd,
                    ]}
                  >
                    <TD style={flexBoxStyles.justifyCenter}>{item.bulan}</TD>
                    <TD>{item.bulan_label}</TD>
                    <TD>{item.keterangan}</TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.iuran_peserta))}
                    </TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.hasil_pengembangan))}
                    </TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.pencairan))}
                    </TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.iuran_perusahaan))}
                    </TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.total_bulanan))}
                    </TD>
                  </TR>
                ))}
              </Table>
            </View>
            <BalanceSummary
              title="Ringkasan Saldo Dana Pensiun"
              list={BALANCE_SUMMARY}
              data={data.footer}
            />
          </>
        )}
        <PdfFooter />
      </Page>
    </Document>
  );
}
