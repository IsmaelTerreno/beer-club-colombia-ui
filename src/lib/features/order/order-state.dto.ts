// Define a type for the slice state
import { Order } from "@/lib/features/app/order.dto";

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}
