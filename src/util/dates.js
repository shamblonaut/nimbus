function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function calculatePartOfDay(hour) {
  if (hour >= 0 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Afternoon";
  else return "Evening";
}

function calculateWeekDay(index) {
  return isNaN(index)
    ? null
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][index];
}

function calculateMonth(index, short = false) {
  if (isNaN(index)) return null;
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][index];

  if (short) return month.substring(0, 3);
  else return month;
}

export {
  getFormattedDate,
  calculateMonth,
  calculatePartOfDay,
  calculateWeekDay,
};
