import { ItemSubtotal } from "@/lib/features/app/item-sub-total.dto";

export interface ItemsRequestRound {
  id: number;
  created_at: string;
  selected_items: ItemSubtotal[];
}
