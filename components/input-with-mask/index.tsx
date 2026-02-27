"use client";

import { Input } from "@/components/ui/input";
import { normalizeNumberInput, formatWithComma } from "./numberMask.utils";
import { useEffect, useState } from "react";
import { InputHTMLAttributes } from "react";

type Props = {
  value?: number | string;
  onChange?: (value: number | null) => void;
  allowDecimal?: boolean;
  allowNegative?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export default function NumberMaskInput({
  value,
  onChange,
  allowDecimal = true,
  allowNegative = false,
  ...rest
}: Props) {
  const [internal, setInternal] = useState<string>("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternal(String(value));
    } else {
      setInternal("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let normalized = normalizeNumberInput(e.target.value);

    if (!allowDecimal) {
      normalized = normalized.replace(/\./g, "");
    }

    if (!allowNegative) {
      normalized = normalized.replace(/-/g, "");
    }

    setInternal(normalized);
    onChange?.(normalized ? parseFloat(normalized) : null);
  };

  return (
    <Input
      {...rest}
      type="text"
      value={formatWithComma(internal)}
      onChange={handleChange}
      inputMode="decimal"
    />
  );
}
