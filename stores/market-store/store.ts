import { create } from "zustand";
import { marketState } from "./types";
import { Market } from "@/data/market/market.types";

export const useMarketStore = create<marketState>((set) => ({
  market: null,
  onSelectMarket: (data: Market) =>
    set({
      market: data,
    }),
  clearMarket: () =>
    set({
      market: null,
    }),
}));
