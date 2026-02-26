"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type OrderState = {
  price: number; // Price per USDT in IRR
  amount: number; // Amount in USDT
  total: number; // Total in IRR
  slider: number; // Percentage of wallet used (0-100)
};

const LOCAL_PRICE = 1_650_000; // default price (1 USDT = 1,650,000 IRR)
const WALLET_BALANCE = 89200; // user's IRR wallet
export default function LimitOder() {
  const [order, setOrder] = useState<OrderState>({
    price: LOCAL_PRICE,
    amount: 0,
    total: 0,
    slider: 0,
  });

  const onSliderChange = (newSliderValue: number) => {
    const newTotal = WALLET_BALANCE * (newSliderValue / 100);
    const newAmount = newTotal / order.price;

    setOrder({
      ...order,
      slider: newSliderValue,
      total: newTotal,
      amount: newAmount,
    });
  };

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

  const onAmountChange = (newAmount: number) => {
    const newTotal = newAmount * order.price;
    const newSlider = (newTotal / WALLET_BALANCE) * 100;
    setOrder({
      ...order,
      amount: newAmount,
      total: newTotal,
      slider: newSlider,
    });
  };

  const onTotalChange = (newTotal: number) => {
    const newAmount = newTotal / order.price;
    const newSlider = (newTotal / WALLET_BALANCE) * 100;

    setOrder({
      ...order,
      total: newTotal,
      amount: newAmount,
      slider: newSlider,
    });
  };
  return (
    <Card className="w-[400px] p-4">
      <CardHeader>
        <CardTitle>balance:{WALLET_BALANCE} </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Input */}
        <div className="space-y-3">
          <Label>Price (IRR)</Label>
          <Input
            type="number"
            value={order.price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label>Amount (USDT)</Label>
          <Input
            type="number"
            value={order.amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
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
  );
}
