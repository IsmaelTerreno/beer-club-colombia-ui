// Define a type for the slice state
import { Order } from "@/lib/features/app/order.dto";
import { Beer } from "@/lib/features/app/beer.dto";
import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  currentBeer: Beer | null;
  currentRounds: ItemsRequestRound[] | null;
}
