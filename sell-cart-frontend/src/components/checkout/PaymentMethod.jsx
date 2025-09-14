import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const paymentMethodHandler = (paymentType) => {
    dispatch(addPaymentMethod(paymentType));
  };

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId]);

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Select Payment Method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="stripe"
            control={<Radio color="primary" />}
            label="Stripe"
            className="text-gray-700"
          />
          <FormControlLabel
            value="paypal"
            control={<Radio color="primary" />}
            label="Paypal"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
