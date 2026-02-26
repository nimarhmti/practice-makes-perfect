import { Market } from "@/data/market/market.types";

export interface marketState {
  market: Market | null;
  onSelectMarket: (data: Market) => void;
  clearMarket: () => void;
}
