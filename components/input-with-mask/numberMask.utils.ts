export const normalizeNumberInput = (value: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  let v = value
    .replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(arabicDigits.indexOf(d)))
    .replace(/٫/g, ".")
    .replace(/,/g, "");

  v = v.replace(/[^0-9.-]/g, "");

  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts[0] + "." + parts.slice(1).join("");
  }

  return v;
};

export const formatWithComma = (value: string): string => {
  if (!value) return "";

  const [int, dec] = value.split(".");
  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
};
