import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Loader from "../shared/Loader";
import ErrorMessage from "../shared/ErrorMessage";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONT_END_URL}/order-confirm`,
      },
    });

    console.log(import.meta.env.VITE_FRONT_END_URL);

    if (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto py-4 mb-8">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

          <button
            disabled={!stripe || isLoading}
            className="w-full text-white bg-black px-5 py-[10px] mt-5 rounded-md font-bold disabled:opacity-50"
          >
            {!isLoading
              ? `Pay $${Number(totalPrice).toFixed(2)}`
              : "Processing"}
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
