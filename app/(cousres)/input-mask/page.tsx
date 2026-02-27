"use client";
import NumberMaskInput from "@/components/input-with-mask";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function InputMAsk() {
  //   const [internal, setInternal] = useState("");
  //   const normalizeNumberInput = (value: string): string => {
  //     const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  //     const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  //     let v = value
  //       .replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)))
  //       .replace(/[٠-٩]/g, (d) => String(arabicDigits.indexOf(d)))
  //       .replace(/٫/g, ".")
  //       .replace(/,/g, ""); // remove all commas first

  //     // allow only digits + decimal
  //     v = v.replace(/[^0-9.]/g, "");

  //     // only one decimal
  //     const parts = v.split(".");
  //     if (parts.length > 2) {
  //       v = parts[0] + "." + parts.slice(1).join("");
  //     }

  //     return v;
  //   };
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const raw = e.target.value;
  //     const normalized = normalizeNumberInput(raw);

  //     setInternal(normalized);
  //   };
  //   const formatWithComma = (value: string): string => {
  //     if (!value) return "";

  //     const [int, dec] = value.split(".");

  //     const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //     return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
  //   };

  //   console.log({ internal: parseFloat(internal) });
  return (
    <div className="flex items-center justify-center h-screen">
      <NumberMaskInput
        placeholder="Enter price"
        className="w-60"
        value={16500000}
        onBlur={() => console.log("blur")}
        onFocus={() => console.log("focus")}
        onChange={(val) => console.log({ val })}
      />
    </div>
  );
}
