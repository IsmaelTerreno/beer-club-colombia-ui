import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { OrderState } from "@/lib/features/order/order-state.dto";
import { AddRoundInOrderAction } from "@/lib/features/app/add-round-in-order-action.dto";
import { RemoveRoundInOrderAction } from "@/lib/features/app/remove-round-in-order-action.dto";
import { UpdateBeerQuantityPlusOneInOrderIdAndRoundIdAction } from "@/lib/features/app/update-beer-quantity-plus-one-in-order-Id-and-round-Id-action.dto";
import { UpdateBeerQuantityMinusOneInOrderIdAndRoundIdAction } from "@/lib/features/app/update-beer-quantity-minus-one-in-order-Id-and-round-Id-action.dto";
import { Beer } from "@/lib/features/app/beer.dto";
import { Order } from "@/lib/features/app/order.dto"; // Define the initial state using that type

// Define the initial state using that type
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  currentBeer: null,
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
  },
});

export const {
  addRoundInOrderId,
  removeRoundInOrderId,
  updateBeerQuantityPlusOneInOrderIdAndRoundId,
  updateBeerQuantityMinusOneInOrderIdAndRoundId,
  setCurrentBeer,
  setCurrentOrder,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrders = (state: RootState) => state.order.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectCurrentBeer = (state: RootState) => state.order.currentBeer;

export default orderSlice.reducer;
