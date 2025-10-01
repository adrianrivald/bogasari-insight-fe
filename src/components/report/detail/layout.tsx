"use client";

import { View, Text, Image as ImagePdf } from "@react-pdf/renderer";
import {
  layoutStyles,
  textStyles,
  flexBoxStyles,
  spacingStyles,
} from "./style-sheet";
import { formatDate } from "../../../utils/format-date";

export const PdfHeader = ({
  title,
  period,
  status,
  opu,
}: {
  title: string;
  period: string;
  status?: string;
  opu?: string;
}) => (
  <View fixed style={layoutStyles.header}>
    <View style={flexBoxStyles.gap6}>
      <Text style={[textStyles.base, textStyles.bold]}>{title}</Text>
      <Text style={[textStyles.md, textStyles.medium]}>
        Dana Pensiun Iuran Pasti Bogasari
      </Text>
      <View style={[flexBoxStyles.flexRow, flexBoxStyles.gap6, textStyles.sm]}>
        <Text>Periode: {period}</Text>
        {status && (
          <>
            <Text>|</Text>
            <Text>Status: {status}</Text>
          </>
        )}
        {opu && (
          <>
            <Text>|</Text>
            <Text>OPU: {opu}</Text>
          </>
        )}
      </View>
    </View>
    <ImagePdf src="/logo-pdf.png" style={layoutStyles.logo} />
  </View>
);

export const PdfFooter = () => (
  <View fixed style={[layoutStyles.footer, textStyles.xs]}>
    <View>
      <Text style={[textStyles.bold, spacingStyles.padding4]}>
        Iuran Pasti Bogasari
      </Text>
      <Text style={[textStyles.medium, spacingStyles.padding4]}>
        Jl. Raya Cilincing No. 1 - Tanjung Priok, Jakarta Utara
      </Text>
    </View>
    <View>
      <Text style={[textStyles.bold, spacingStyles.padding4]}>
        Printed Date
      </Text>
      <Text style={[textStyles.medium, spacingStyles.padding4]}>
        {formatDate(new Date(), "DD MMMM YYYY, HH:mm")} WIB
      </Text>
    </View>
    <View>
      <Text style={[textStyles.bold, spacingStyles.padding4]}>Halaman</Text>
      <Text
        style={[textStyles.medium, spacingStyles.padding4]}
        render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
      />
    </View>
  </View>
);
