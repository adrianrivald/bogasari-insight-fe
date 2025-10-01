"use client";

import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Table, TH, TD, TR } from "@ag-media/react-pdf-table";
import { PdfHeader, PdfFooter } from "./layout";
import DetailEmployee from "./detail-employee";
import BalanceSummary from "./balance-summary";
import {
  flexBoxStyles,
  layoutStyles,
  tableStyles,
  textStyles,
} from "./style-sheet";
import { formatRupiah } from "../../../utils/format-rupiah";

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
    key: "mutasi_debet",
    label: "Mutasi Debet",
    currency: true,
  },
  {
    key: "mutasi_kredit",
    label: "Mutasi Kredit",
    currency: true,
  },
  {
    key: "saldo_akhir",
    label: "Saldo Akhir",
    currency: true,
  },
];

export default function DetailBenefits({
  data,
  period,
}: {
  data?: any;
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
                Riwayat Kontribusi Bulanan - Detail
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
                  <TD style={[flexBoxStyles.justifyCenter]}>Kode</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Mutasi</TD>
                  <TD style={[flexBoxStyles.justifyCenter]}>D/K</TD>
                  <TD style={[flexBoxStyles.justifyCenter]}>HP (%)</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Saldo</TD>
                </TH>
                <TH style={layoutStyles.bgGrayDark}>
                  <TD />
                  <TD>Saldo Awal</TD>
                  <TD />
                  <TD />
                  <TD />
                  <TD />
                  <TD />
                  <TD style={flexBoxStyles.justifyEnd}>
                    {formatRupiah(Number(data.footer.saldo_awal))}
                  </TD>
                </TH>
                {Object.keys(data.content).map((key, idx) => (
                  <TR key={key}>
                    <TD style={flexBoxStyles.justifyCenter}>{idx + 1}</TD>
                    <TD weighting={0.131}>
                      {data.content[key][0].bulan_opu_jobclass}
                    </TD>
                    <TD
                      style={[flexBoxStyles.flexCol, flexBoxStyles.itemsStart]}
                    >
                      {data.content[key].map((item: any, index: number) => (
                        <TR
                          key={`${item.no}-${index}`}
                          style={[
                            flexBoxStyles.flexRow,
                            layoutStyles.widthFull,
                            index % 2
                              ? tableStyles.rowEven
                              : tableStyles.rowOdd,
                          ]}
                        >
                          <TD weighting={0.167}>{item.keterangan}</TD>
                          <TD
                            weighting={0.167}
                            style={flexBoxStyles.justifyCenter}
                          >
                            {item.code}
                          </TD>
                          <TD style={flexBoxStyles.justifyEnd}>
                            {formatRupiah(Number(item.mutasi))}
                          </TD>
                          <TD style={flexBoxStyles.justifyCenter}>{item.dk}</TD>
                          <TD style={flexBoxStyles.justifyCenter}>{item.hp}</TD>
                          <TD style={flexBoxStyles.justifyEnd}>
                            {formatRupiah(Number(item.saldo))}
                          </TD>
                        </TR>
                      ))}
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
