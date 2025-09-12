const initialState = {
  isLoading: false,
  errorMessage: null,
  categoryLoader: false,
  categoryError: null,
  buttonLoader: false,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case "BUTTON_LOADER":
      return {
        ...state,
        errorMessage: null,
        buttonLoader: true,
        categoryError: null,
      };

    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: false,
        buttonLoader: false,
        categoryError: null,
        categoryLoader: false,
      };

    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        buttonLoader: false,
        categoryLoader: false,
      };

    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        errorMessage: null,
      };

    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryLoader: false,
        errorMessage: null,
        categoryError: null,
      };

    default:
      return state;
  }
};
