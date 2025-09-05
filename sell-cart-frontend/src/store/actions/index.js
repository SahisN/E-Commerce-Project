import Api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await Api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await Api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    console.log("dispatch");
    console.log(getState());
    // Find the product
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    // Check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    // If in stock -> add
    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
      toast.success(`${data?.productName} added to the cart`);
    }

    // If not --> error
    else {
      toast.error(`${data?.productName} is out of stock`);
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    // find product
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    // check if product has enough stock
    const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

    // if in stock -> add
    if (isQuantityExist) {
      // update quantity in ui
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);

      // update quantity in redux
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });

      // update quantity in localstorage
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached to Limit");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`Removed ${data.productName} from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticationSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      console.log(sendData);
      const { data } = await Api.post("/auth/login", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to login");
    } finally {
      setLoader(false);
    }
  };
