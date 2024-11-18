import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";

export interface RemoveRoundInOrderAction {
  id_order: string;
  round: ItemsRequestRound;
}
