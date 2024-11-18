import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "@/lib/features/order/orderSlice";
import { stockSlice } from "@/lib/features/stock/stockSlice";
import { messageSlice } from "@/lib/features/message/messageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      order: orderSlice.reducer,
      stock: stockSlice.reducer,
      message: messageSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
