import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "@/lib/features/order/orderSlice";
import { stockSlice } from "@/lib/features/order/stockSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      order: orderSlice.reducer,
      stock: stockSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
