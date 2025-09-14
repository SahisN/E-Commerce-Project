import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./ErrorReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  auth: { user: user },
  carts: { cart: cartItems },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    errors: errorReducer,
  },
  preloadedState: initialState,
});

export default store;
