import dayjs from "dayjs";

export function getTimeOfDay() {
  const hour = dayjs().hour(); // get current hour (0–23)

  if (hour >= 5 && hour < 12) {
    return "Pagi";
  } else if (hour >= 12 && hour < 17) {
    return "Siang";
  } else if (hour >= 17 && hour < 21) {
    return "Malam";
  } else {
    return "Malam"; // optional
  }
}
