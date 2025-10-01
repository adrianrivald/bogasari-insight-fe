"use client";

import { View, Text } from "@react-pdf/renderer";
import { flexBoxStyles, textStyles } from "./style-sheet";
import { pixelsToPoints } from "../../../utils/pixel-to-points";
import { formatRupiah } from "../../../utils/format-rupiah";

export default function BalanceSummary<
  T extends Record<string, string | null>
>({
  data,
  list,
  title,
  small,
  left,
}: {
  data: T;
  list: { key: string; label: string; currency?: boolean }[];
  title: string;
  small?: boolean;
  left?: boolean;
}) {
  return (
    <View
      style={{
        rowGap: pixelsToPoints(8),
        marginVertical: pixelsToPoints(24),
        paddingHorizontal: pixelsToPoints(20),
      }}
    >
      <Text style={[textStyles.sm, textStyles.semiBold]}>{title}</Text>
      {list.map((item, index) => (
        <View
          key={`${item.key}-${index}`}
          style={[textStyles.xs, flexBoxStyles.flexRow]}
        >
          <Text
            style={[
              textStyles.medium,
              small ? { width: pixelsToPoints(200) } : { width: "30%" },
            ]}
          >
            {item.label}
          </Text>
          {left && <Text style={textStyles.semiBold}>: </Text>}
          <Text
            style={[
              textStyles.semiBold,
              left ? textStyles.textLeft : textStyles.textRight,
              small ? { width: "10%" } : { width: "30%" },
            ]}
          >
            {item.currency
              ? formatRupiah(Number(data?.[item.key]))
              : data?.[item.key]}
          </Text>
        </View>
      ))}
    </View>
  );
}
