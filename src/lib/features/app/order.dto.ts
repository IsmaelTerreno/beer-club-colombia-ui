import { Item } from "@/lib/features/app/item.dto";
import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";
import { ItemSubtotal } from "@/lib/features/app/item-sub-total.dto";

export interface Order {
  id: string;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  total_to_pay: number;
  cash_tendered: number;
  cash_returned: number;
  option_items: Item[];
  rounds: ItemsRequestRound[];
  status: string;
  details: string;
  processed_items: ItemSubtotal[];
}
