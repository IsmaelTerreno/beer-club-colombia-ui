import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";

export interface AddRoundInOrderAction {
  id_order: string;
  round: ItemsRequestRound;
}
