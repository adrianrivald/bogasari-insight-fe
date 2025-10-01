import dayjs from "dayjs";

/**
 * Get the formatted date according to the string
 * @param date Date | string
 * @param format default to 'LL'
 * @returns formatted date in string
 * @example valid date return '22/12/1890'
 * @example invalid return '-'
 */
export function formatDate(date: dayjs.ConfigType, format?: string) {
  if (date) {
    return dayjs(date)
      .locale("id")
      .format(format ?? "LL");
  }

  return "-";
}
