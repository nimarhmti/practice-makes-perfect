"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberMaskInput from "@/components/input-with-mask";
type OrderState = {
  price: number; // Price per USDT in IRR
  amount: number; // Amount in USDT
  total: number; // Total in IRR
  slider: number; // Percentage of wallet used (0-100)
};

const LOCAL_PRICE = 1_650_000; // default price (1 USDT = 1,650,000 IRR)
const WALLET_BALANCE = 89200; // user's IRR wallet
const DECIMALS = 3; // USDT precision
export default function LimitOder() {
  // Utility: clamp value between 0 and max
  const clamp = (value: number, max: number) =>
    Math.min(Math.max(value, 0), max);
  const [order, setOrder] = useState<OrderState>({
    price: LOCAL_PRICE,
    amount: 0,
    total: 0,
    slider: 0,
  });
  const persianToEnglishDigits = (str: string) => {
    return str.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));
  };
  const sanitizeNumberInput = (str: string) => {
    const normalized = persianToEnglishDigits(str);

    // Remove all characters except digits and dot
    const cleaned = normalized.replace(/[^0-9.]/g, "");

    // Keep only the first dot, remove extra dots
    const parts = cleaned.split(".");

    return parts.length > 1
      ? parts[0] + "." + parts.slice(1).join("")
      : cleaned;
  };
  const formatNumber = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: DECIMALS,
    });
  // Slider change

  const onSliderChange = (newSliderValue: number) => {
    const newTotal = WALLET_BALANCE * (newSliderValue / 100);
    const newAmount = parseFloat((newTotal / order.price).toFixed(DECIMALS));

    setOrder({
      ...order,
      slider: newSliderValue,
      total: newTotal,
      amount: newAmount,
    });
  };

  // Price change
  const onPriceChange = (newPrice: number) => {
    const newTotal = newPrice * order.amount;
    const newSlider = (newTotal / WALLET_BALANCE) * 100;

    setOrder({
      ...order,
      price: newPrice,
      total: newTotal,
      slider: newSlider,
    });
  };

  // Amount change
  const onAmountChange = (newAmount: number) => {
    const newTotal = newAmount * order.price;
    const newSlider = (newTotal / WALLET_BALANCE) * 100;

    setOrder({
      ...order,
      amount: parseFloat(newAmount.toFixed(DECIMALS)),
      total: newTotal,
      slider: newSlider,
    });
  };

  // Optional: Total editable
  const onTotalChange = (newTotal: number) => {
    const clampedTotal = clamp(newTotal, WALLET_BALANCE);
    const amount = parseFloat((clampedTotal / order.price).toFixed(DECIMALS));
    const slider = (clampedTotal / WALLET_BALANCE) * 100;

    setOrder({
      ...order,
      total: clampedTotal,
      amount,
      slider,
    });
  };

  //   console.log("price", order.price);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px] p-4">
        <CardHeader>
          <CardTitle>balance:{WALLET_BALANCE} </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price Input */}
          <div className="space-y-3">
            <Label>Price (IRR)</Label>
            {/* <Input
              type="text"
              value={formatNumber(order.price)}
              onChange={(e) => {
                const cleaned = sanitizeNumberInput(e.target.value);
                if (cleaned === "" || cleaned === ".") {
                  onPriceChange(0); // treat empty or just dot as 0
                } else {
                  //   onPriceChange(Number(cleaned));
                  console.log(cleaned);
                }
              }}
            /> */}

            <NumberMaskInput
              placeholder="Enter price"
              value={order.price}
              onChange={(val) => onPriceChange(val ?? 0)}
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label>Amount (USDT)</Label>
            {/* <Input
              type="number"
              value={order.amount}
              step={0.000001}
              onChange={(e) => onAmountChange(Number(e.target.value))}
            /> */}
            <NumberMaskInput
              placeholder="Enter amount"
              value={order.amount}
              onChange={(val) => onAmountChange(val ?? 0)}
            />
          </div>

          {/* Total Input */}
          <div className="space-y-2">
            <Label>Total (IRR)</Label>
            <Input type="number" value={order.total} readOnly />
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <Label>Use Wallet (%)</Label>
            <Slider
              value={[order.slider]}
              max={100}
              step={1}
              onValueChange={(val) => onSliderChange(val[0])}
            />
            <p>{order.slider.toFixed(0)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
