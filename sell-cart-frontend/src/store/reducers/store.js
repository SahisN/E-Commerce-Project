import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./ErrorReducer";

const cardItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  carts: { cart: cardItems },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    errors: errorReducer,
  },
  preloadedState: initialState,
});

export default store;
