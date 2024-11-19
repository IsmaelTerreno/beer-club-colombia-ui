import { Order } from "@/lib/features/app/order.dto";
import { v1 as uuidV1 } from "uuid";
import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";

export const getNewBlankOrder = (): Order => {
  return {
    id: uuidV1(),
    created: new Date().toLocaleString(),
    paid: false,
    subtotal: 0,
    taxes: 2,
    discounts: 0,
    total_to_pay: 0,
    cash_tendered: 0,
    cash_returned: 0,
    details: "",
    rounds: [],
    option_items: [],
    processed_items: [],
    status: "PENDING",
  };
};

export const getNewBlankRound = (): ItemsRequestRound => {
  return {
    id: uuidV1(),
    selected_items: [],
    created_at: new Date().toLocaleString(),
  };
};
