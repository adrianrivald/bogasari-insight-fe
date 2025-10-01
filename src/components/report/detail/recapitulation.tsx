"use client";

import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { Table, TH, TD, TR } from "@ag-media/react-pdf-table";
import { PdfHeader, PdfFooter } from "./layout";
import BalanceSummary from "./balance-summary";
import type { RecapitulationData } from "@/types/api";
import {
  flexBoxStyles,
  layoutStyles,
  tableStyles,
  textStyles,
} from "./style-sheet";
import { formatDate, formatIDR, listMonth } from "@/lib/utils";

const BALANCE_SUMMARY = [
  {
    key: "opu",
    label: "Total OPU",
  },
  {
    key: "saldo_awal",
    label: "Total Saldo Awal",
    currency: true,
  },
  {
    key: "saldo_akhir",
    label: "Total Saldo Akhir",
    currency: true,
  },
];

type MonthKeys = keyof Partial<RecapitulationData>;

export default function Recapitulation({
  data,
  period,
}: {
  data: RecapitulationData[];
  period: string;
}) {
  const totalBalance = data.reduce(
    (prev, current) => prev + Number(current.saldo_awal),
    0
  );

  const totalEnding = data.reduce(
    (prev, current) => prev + Number(current.saldo_akhir),
    0
  );

  const summary = {
    opu: '0',
    saldo_awal: String(totalBalance),
    saldo_akhir: String(totalEnding),
  };

  return (
    <Document author="DPIP" creator="DPIP">
      <Page orientation="landscape" style={layoutStyles.page}>
        <PdfHeader
          title="Rekapitulasi Dana Pensiun Peserta"
          period={period}
        />
        {data && (
          <>
            <View style={layoutStyles.main}>
              <Table
                style={[textStyles.xxs]}
                tdStyle={tableStyles.cell}
                weightings={[0.025]}
              >
                <TH fixed style={[textStyles.bold, tableStyles.rowEven]}>
                  <TD style={flexBoxStyles.justifyCenter}>No</TD>
                  <TD>Nama & No Peserta</TD>
                  <TD style={flexBoxStyles.justifyEnd}>Saldo Awal</TD>
                  {listMonth().map((month) => (
                    <TD
                      key={`header-${month.value}`}
                      style={flexBoxStyles.justifyEnd}
                    >
                      {formatDate(month.value, "MMM")}
                    </TD>
                  ))}
                  <TD style={flexBoxStyles.justifyEnd}>Saldo Akhir</TD>
                </TH>
                {data.map((item, index) => (
                  <TR
                    key={index}
                    style={[
                      textStyles.medium,
                      index % 2 ? tableStyles.rowEven : tableStyles.rowOdd,
                    ]}
                  >
                    <TD style={flexBoxStyles.justifyCenter}>{item.no}</TD>
                    <TD>{item.nama_peserta}</TD>
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.saldo_awal))}
                    </TD>
                    {listMonth().map((month) => {
                      let keyMonth = formatDate(
                        month.value,
                        "MMM"
                      ).toLowerCase();
                      keyMonth = keyMonth === "agt" ? "agu" : keyMonth;

                      return (
                        <TD
                          key={`row-${month.value}`}
                          style={flexBoxStyles.justifyEnd}
                        >
                          {formatIDR(Number(item[keyMonth as MonthKeys]))}
                        </TD>
                      );
                    })}
                    <TD style={flexBoxStyles.justifyEnd}>
                      {formatIDR(Number(item.saldo_akhir))}
                    </TD>
                  </TR>
                ))}
                <TR>
                  <TD />
                  <TD />
                  <TD style={[flexBoxStyles.itemsEnd, flexBoxStyles.flexCol]}>
                    <Text>Total Saldo</Text>
                    <Text>{formatIDR(totalBalance)}</Text>
                  </TD>
                  {listMonth().map((month) => (
                    <TD key={`footer-${month.value}`} />
                  ))}
                  <TD style={[flexBoxStyles.itemsEnd, flexBoxStyles.flexCol]}>
                    <Text>Total Saldo</Text>
                    <Text>{formatIDR(totalEnding)}</Text>
                  </TD>
                </TR>
              </Table>
            </View>
            <BalanceSummary
              title="Semua Ringkasan"
              list={BALANCE_SUMMARY}
              data={summary}
              small
              left
            />
          </>
        )}
        <PdfFooter />
      </Page>
    </Document>
  );
}
