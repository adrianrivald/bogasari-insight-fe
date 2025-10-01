"use client";

import { View, Text } from "@react-pdf/renderer";
import { textStyles } from "./style-sheet";
import { pixelsToPoints } from "../../../utils/pixel-to-points";

export default function DetailEmployee<
  T extends Record<string, string | null>
>({
  data,
  list,
}: {
  data: T;
  list: {
    key: string;
    label: string;
  }[];
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: pixelsToPoints(5),
        rowGap: pixelsToPoints(10),
        marginBottom: pixelsToPoints(24),
        paddingHorizontal: pixelsToPoints(20),
      }}
    >
      {list.map((item) => (
        <View
          key={item.key.toString()}
          style={[textStyles.xs, { flexBasis: "32%", gap: 2 }]}
        >
          <Text>{item.label}</Text>
          <Text style={textStyles.semiBold}>{data[item.key]}</Text>
        </View>
      ))}
    </View>
  );
}
