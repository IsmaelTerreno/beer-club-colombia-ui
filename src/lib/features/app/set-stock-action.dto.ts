import { Stock } from "@/lib/features/app/stock.dto";

export interface SetStockAction {
  stock: Stock | null;
}
