const initialState = {
  cart: [],
  totalPrice: 0,
  cartId: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      const addedProduct = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.productId === addedProduct.productId
      );

      if (existingProduct) {
        const updatedCart = state.cart.map((item) => {
          if (item.productId === addedProduct.productId) {
            return addedProduct;
          } else {
            return item;
          }
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const newCart = [...state.cart, addedProduct];
        return {
          ...state,
          cart: newCart,
        };
      }

    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    default:
      return state;
  }
};
