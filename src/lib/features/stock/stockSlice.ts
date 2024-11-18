import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SetStockAction } from "@/lib/features/app/set-stock-action.dto";
import { StockState } from "@/lib/features/stock/stock-state.dto"; // Define the initial state using that type

// Define the initial state using that type
const initialState: StockState = {
  currentStock: null,
};

export const stockSlice = createSlice({
  name: "stock",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStock: (state, action: PayloadAction<SetStockAction>) => {
      state.currentStock = action.payload.stock;
    },
  },
});

export const { setStock } = stockSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentStock = (state: RootState) =>
  state.stock.currentStock;

export default stockSlice.reducer;
