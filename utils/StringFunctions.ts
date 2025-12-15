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

export const toSnakeCase = (str: string) => {
  return str.trim().toLowerCase().replace(/\s+/g, "_");
};

export function underscoreToSpace(text: string): string {
  return text.replace(/_/g, " ");
}

export const splitCamelCase = (text: string): string => {
  if (!text) return "";
  return text.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
};

export const formatUrl = (url: string) => {
  if (!url) return "/";

  const clean = url.trim().split(" ")[0];

  // If it's a hash or local anchor → return as is
  if (clean.startsWith("#")) return clean;

  // If user enters something like "/", "../", "./"
  if (clean.startsWith("/")) return clean;

  // If user enters "www.facebook.com" or "google.com"
  const isValidDomain = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean);

  if (isValidDomain) {
    return `https://${clean}`;
  }

  // If already has http/https
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }

  return "/";
};

const StaticValues = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  INVALID: "Invalid",
  ADMIN: "Admin",
  USER: "Member",
  MODERATOR: "Moderator",
  YES: "Yes",
  NO: "No",
  YEAR: "Year",
  MONTH: "Month",
  DAY: "Day",
  WEEK: "Week",
  YEARLY: "Yearly",
  MONTHLY: "Monthly",
  WEEKLY: "Weekly",
  DAILY: "Daily",
  QUARTERLY: "Quarterly",
  HALF_YEARLY: "Half Yearly",
  ONE_TIME: "One Time",
  FREE: "Free",
  PAID: "Paid",
  PUBLIC: "Public",
  PRIVATE: "Private",
  BUSYNESS: "Business",
  Business: "Business",
  TECHNOLOGY: "Technology",
  "Role Type": "Role",
  INVITED: "Invited",
  IN_ACTIVE: "In_Active",
  userCancelled: "Cancelled",
  FAILURE: "Failed",
  SUCCESS: "Success",
  USERCANCELLED: "Cancelled",
  DROPPED: "Dropped",
  SUPERADMIN: "Superadmin",
  dayly: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  half_yearly: "Half Yearly",
  one_time: "One Time",
  yearly: "Yearly",
  REJECT: "Reject",
  NOT_PAID: "Not Paid",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
  PAID_BY_CASH: "Paid By Cash",
  Settled: "Settled",
  NA: "NA",
  PENDING: "Pending",
  PENDINGPAYMENT: "Pay now",
  FOREVER: "Forever",
  ALLDAYS: "All Days",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Weds",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
  CUSTOM: "Custom",
};
export const getStaticValue = (key: string) => {
  //console.log(key);
  return StaticValues[key as keyof typeof StaticValues]; // Use type assertion
};
