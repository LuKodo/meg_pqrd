import { DateTime } from "luxon";

export function addBusinessDays(
  date: DateTime,
  days: number
): DateTime {
  let result = date;
  let added = 0;

  while (added < days) {
    result = result.plus({ days: 1 });

    // 1 = Monday, 7 = Sunday
    if (result.weekday <= 5) {
      added++;
    }
  }

  return result;
}
