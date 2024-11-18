import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { OrderState } from "@/lib/features/order/order-state.dto";
import { AddRoundInOrderAction } from "@/lib/features/app/add-round-in-order-action.dto";
import { RemoveRoundInOrderAction } from "@/lib/features/app/remove-round-in-order-action.dto";
import { UpdateBeerQuantityPlusOneInOrderIdAndRoundIdAction } from "@/lib/features/app/update-beer-quantity-plus-one-in-order-Id-and-round-Id-action.dto";
import { UpdateBeerQuantityMinusOneInOrderIdAndRoundIdAction } from "@/lib/features/app/update-beer-quantity-minus-one-in-order-Id-and-round-Id-action.dto";
import { Beer } from "@/lib/features/app/beer.dto";
import { Order } from "@/lib/features/app/order.dto";
import { ItemsRequestRound } from "@/lib/features/app/items-request-round.dto";
import { ItemSubtotal } from "@/lib/features/app/item-sub-total.dto"; // Define the initial state using that type
import { v1 as uuidV1 } from "uuid";
// Define the initial state using that type
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  currentBeer: null,
  currentRound: null,
  currentRounds: [],
};

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addRoundInOrderId: (
      state,
      action: PayloadAction<AddRoundInOrderAction>,
    ) => {
      state.orders
        .find((order) => order.id === action.payload.id_order)
        ?.rounds.push(action.payload.round);
    },
    removeRoundInOrderId: (
      state,
      action: PayloadAction<RemoveRoundInOrderAction>,
    ) => {
      state.orders
        .find((order) => order.id === action.payload.id_order)
        ?.rounds.filter((round) => round.id !== action.payload.round.id);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateBeerQuantityPlusOneInOrderIdAndRoundId: (
      state,
      action: PayloadAction<UpdateBeerQuantityPlusOneInOrderIdAndRoundIdAction>,
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id_order,
      );
      if (order) {
        const round = order.rounds.find(
          (round) => round.id === action.payload.id_round,
        );
        if (round) {
          const item = round.selected_items.find(
            (item) => item.id_item === action.payload.id_beer,
          );
          if (item) {
            item.quantity += 1;
          }
        }
      }
    },
    updateBeerQuantityMinusOneInOrderIdAndRoundId: (
      state,
      action: PayloadAction<UpdateBeerQuantityMinusOneInOrderIdAndRoundIdAction>,
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id_order,
      );
      if (order) {
        const round = order.rounds.find(
          (round) => round.id === action.payload.id_round,
        );
        if (round) {
          const item = round.selected_items.find(
            (item) => item.id_item === action.payload.id_beer,
          );
          if (item) {
            item.quantity -= 1;
          }
        }
      }
    },
    setCurrentBeer: (state, action: PayloadAction<Beer | null>) => {
      state.currentBeer = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    setCurrentRound: (
      state,
      action: PayloadAction<ItemsRequestRound | null>,
    ) => {
      state.currentRound = action.payload;
    },
    addBeerToCurrentRound: (state, action: PayloadAction<Beer | null>) => {
      const beer = action.payload;
      if (beer) {
        const isBeerInRound = state.currentRound?.selected_items.find(
          (item) => item.id_item === beer.id.toString(),
        );
        if (!isBeerInRound && beer.id) {
          const newId = uuidV1();
          const newItemSubtotal: ItemSubtotal = {
            id: newId,
            id_item: beer.id.toString(),
            quantity: 1,
            price_per_unit: beer.price_per_unit,
            sub_total: beer.price_per_unit,
          };
          state.currentRound?.selected_items.push(newItemSubtotal);
          if (state.currentRounds.length === 0 && state.currentRound) {
            state.currentRounds.push(state.currentRound);
          }
          // setMessageApp({
          //   message: "Added beer to the round.",
          //   severity: "info",
          //   setOpen,
          //   open,
          // });
          // setOpen(true);
        } else {
          // setMessageApp({
          //   message: "Beer already in the round.",
          //   severity: "warning",
          //   setOpen,
          //   open,
          // });
          // setOpen(true);
        }
      }
    },
  },
});

export const {
  addRoundInOrderId,
  removeRoundInOrderId,
  updateBeerQuantityPlusOneInOrderIdAndRoundId,
  updateBeerQuantityMinusOneInOrderIdAndRoundId,
  setCurrentBeer,
  setCurrentOrder,
  setCurrentRound,
  addBeerToCurrentRound,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrders = (state: RootState) => state.order.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectCurrentBeer = (state: RootState) => state.order.currentBeer;
export const selectCurrentRound = (state: RootState) =>
  state.order.currentRound;
export const selectCurrentRounds = (state: RootState) =>
  state.order.currentRounds;

export default orderSlice.reducer;
