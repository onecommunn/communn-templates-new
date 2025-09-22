export function capitalizeWords(text: string): string {
  if (!text) return "";

  return text
    .replace(/_/g, " ") // replace underscores with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // invalid date check

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return "";

  const [hoursStr, minutes] = timeStr.split(":");
  let hours = parseInt(hoursStr, 10);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12, 13 → 1

  return `${hours}:${minutes} ${ampm}`;
}