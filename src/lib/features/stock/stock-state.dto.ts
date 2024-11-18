import { Stock } from "@/lib/features/app/stock.dto";

export interface StockState {
  stock: Stock | null;
}
