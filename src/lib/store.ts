import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "@/lib/features/order/orderSlice";
import { stockSlice } from "@/lib/features/stock/stockSlice";
import { messageSlice } from "@/lib/features/message/messageSlice";
import { api } from "@/lib/features/api/beer-club-colombia-api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      order: orderSlice.reducer,
      stock: stockSlice.reducer,
      message: messageSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
