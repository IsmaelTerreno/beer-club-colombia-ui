import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { OrderState } from "@/lib/features/order/order-state.dto";
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
  rounds: [],
};

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateBeerQuantityPlusOneInOrderIdAndRoundId: (
      state,
      action: PayloadAction<UpdateBeerQuantityPlusOneInOrderIdAndRoundIdAction>,
    ) => {
      const round = state.currentRound;
      // If we have the round
      if (round) {
        // Find the item in the round
        const item = round.selected_items.find(
          (item) => item.id_item === action.payload.id_beer,
        );
        // If we have the item
        if (item) {
          // Increase the quantity of the item by one
          item.quantity += 1;
        }
      }
    },
    updateBeerQuantityMinusOneInOrderIdAndRoundId: (
      state,
      action: PayloadAction<UpdateBeerQuantityMinusOneInOrderIdAndRoundIdAction>,
    ) => {
      const round = state.currentRound;
      // If we have the round
      if (round) {
        // Find the item in the round
        const item = round.selected_items.find(
          (item) => item.id_item === action.payload.id_beer,
        );
        // If we have the item
        if (item && item.quantity === 1) {
          // Remove the item from the round not including the item with quantity 0
          round.selected_items = round.selected_items.filter(
            (item) => item.id_item !== action.payload.id_beer,
          );
        } else if (item && item.quantity > 1) {
          // Decrease the quantity of the item by one
          item.quantity -= 1;
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
      // If we have a beer and a current round
      if (beer) {
        // Check if the beer is already in the round
        const isBeerInRound = state.currentRound?.selected_items.find(
          (item) => item.id_item === beer.id.toString(),
        );
        // If the beer is not in the round
        if (!isBeerInRound && beer.id) {
          // Create a new item subtotal
          const newId = uuidV1();
          const newItemSubtotal: ItemSubtotal = {
            id: newId,
            id_item: beer.id.toString(),
            quantity: 1,
            price_per_unit: beer.price_per_unit,
            sub_total: beer.price_per_unit,
          };
          // Add the new item subtotal to the current round
          state.currentRound?.selected_items.push(newItemSubtotal);
          // If we don't have any rounds yet, add the current round to the list
          if (state.rounds.length === 0 && state.currentRound) {
            // Add the current round to the list of rounds
            state.rounds.push(state.currentRound);
            // If we have rounds, check if the current round is already in the list
          } else if (state.rounds.length > 0 && state.currentRound) {
            // Find the current round in the list of rounds
            const findRound = state.rounds.find(
              (round) => round.id === state.currentRound?.id,
            );
            // If we don't find the current round in the list
            if (!findRound) {
              // Add the current round to the list of rounds
              state.rounds.push(state.currentRound);
            } else {
              // If we find the current round in the list, update the round
              state.rounds.map((round) => {
                // Check if the current round is the same as the round in the list
                if (round.id === state.currentRound?.id) {
                  // Add the new item subtotal to the current round
                  round.selected_items.push(newItemSubtotal);
                }
              });
            }
          }
        }
      }
    },
    saveCurrentRoundToRounds: (state) => {
      const currentRound = state.currentRound;
      if (currentRound) {
        const isRoundInRounds = state.rounds.find(
          (round) => round.id === currentRound.id,
        );
        if (!isRoundInRounds) {
          // Add the current round to the list of rounds
          state.rounds.push(currentRound);
        } else {
          // If we find the current round in the list, update the round
          state.rounds.map((round) => {
            // Check if the current round is the same as the round in the list
            if (round.id === currentRound.id) {
              // Update the round
              round = currentRound;
            }
          });
        }
      }
    },
  },
});

export const {
  updateBeerQuantityPlusOneInOrderIdAndRoundId,
  updateBeerQuantityMinusOneInOrderIdAndRoundId,
  setCurrentBeer,
  setCurrentOrder,
  setCurrentRound,
  addBeerToCurrentRound,
  saveCurrentRoundToRounds,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrders = (state: RootState) => state.order.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectCurrentBeer = (state: RootState) => state.order.currentBeer;
export const selectCurrentRound = (state: RootState) =>
  state.order.currentRound;
export const selectItemSubtotalsInCurrentRound = (state: RootState) =>
  state.order.currentRound?.selected_items;
export const selectRounds = (state: RootState) => state.order.rounds;

export default orderSlice.reducer;
