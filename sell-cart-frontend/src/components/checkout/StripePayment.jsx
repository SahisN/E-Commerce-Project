import { Alert, AlertTitle } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/actions";
import Loader from "../shared/Loader";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );

  console.log("address: " + selectedUserCheckoutAddress);

  console.log(clientSecret);

  useEffect(() => {
    if (!clientSecret) {
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "usd",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1",
        },
      };
      dispatch(createStripePaymentSecret(sendData, toast));
    }
  }, [clientSecret]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    // <div className="flex justify-center items-center h-96">
    //   <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
    //     <AlertTitle>Stripe Method Unavailable</AlertTitle>
    //     Stripe payment is unavaliable. Please use another payment method.
    //   </Alert>
    // </div>

    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
