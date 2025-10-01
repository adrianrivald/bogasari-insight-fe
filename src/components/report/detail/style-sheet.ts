import { StyleSheet, Font } from "@react-pdf/renderer";
import { pixelsToPoints } from "../../../utils/pixel-to-points";

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/fonts/Poppins-Regular.ttf" },
    { src: "/fonts/Poppins-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Poppins-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Poppins-Bold.ttf", fontWeight: 700 },
  ],
});

export const layoutStyles = StyleSheet.create({
  header: {
    paddingTop: pixelsToPoints(20),
    paddingHorizontal: pixelsToPoints(20),
    paddingBottom: pixelsToPoints(8),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: pixelsToPoints(20),
    right: pixelsToPoints(20),
    left: pixelsToPoints(20),
    flexDirection: "row",
    gap: pixelsToPoints(84),
  },
  main: {
    padding: pixelsToPoints(20),
    gap: pixelsToPoints(16),
  },
  page: {
    paddingBottom: pixelsToPoints(83),
  },
  logo: {
    width: pixelsToPoints(74),
  },
  bgGrayDark: {
    backgroundColor: "#E2E2E2",
  },
  widthFull: {
    width: "100%",
  },
});

export const flexBoxStyles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexCol: {
    flexDirection: "column",
  },
  gap6: {
    gap: pixelsToPoints(6),
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
});

export const spacingStyles = StyleSheet.create({
  padding4: {
    padding: pixelsToPoints(4),
  },
});

export const textStyles = StyleSheet.create({
  base: {
    fontFamily: "Poppins",
    fontSize: pixelsToPoints(16),
  },
  md: {
    fontFamily: "Poppins",
    fontSize: pixelsToPoints(14),
  },
  sm: {
    fontFamily: "Poppins",
    fontSize: pixelsToPoints(10),
  },
  xs: {
    fontFamily: "Poppins",
    fontSize: pixelsToPoints(8),
  },
  xxs: {
    fontFamily: "Poppins",
    fontSize: pixelsToPoints(6),
  },
  bold: {
    fontWeight: 700,
  },
  semiBold: {
    fontWeight: 600,
  },
  medium: {
    fontWeight: 500,
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
  },
});

export const tableStyles = StyleSheet.create({
  rowEven: {
    backgroundColor: "#F5F5F5",
  },
  rowOdd: {
    backgroundColor: "#FFF",
  },
  cell: {
    paddingHorizontal: pixelsToPoints(4),
    paddingVertical: pixelsToPoints(6),
    borderWidth: "0",
  },
});
