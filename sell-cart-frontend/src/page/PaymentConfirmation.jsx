import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { FaCheckCircle } from "react-icons/fa";
import { stripePaymentConfirmation } from "../store/actions";
import toast from "react-hot-toast";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const [isLoading, setLoading] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const { address, selectedUserCheckoutAddress } = localStorage.getItem(
    "CHECKOUT_ADDRESS"
  )
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        addressId: "2",
        paymentMethod: 1,
        pgName: "stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment Successful",
      };

      console.log(selectedUserCheckoutAddress);
      console.log(sendData);

      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast)
      );

      console.log(selectedUserCheckoutAddress);
      console.log(address);
    }
  }, [paymentIntent, clientSecret, redirectStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <div className="text-green-500 mb-4 flex justify-center">
            <FaCheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Summary
          </h2>

          <p>
            Thank you for your purchase! Your payment was successful. We are
            processing your order
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
