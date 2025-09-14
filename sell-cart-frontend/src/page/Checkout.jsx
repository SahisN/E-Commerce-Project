import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "../components/checkout/AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../store/actions";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import StripePayment from "../components/checkout/StripePayment";
import PaypalPayment from "../components/checkout/PaypalPayment";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch(0);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  const { paymentMethod } = useSelector((state) => state.payment);

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please selected checkout address before proceeding.");
    } else if (
      activeStep === 1 &&
      (!selectedUserCheckoutAddress || !paymentMethod)
    ) {
      toast.error("Please selected payment option before proceeding.");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Loader />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && (
            <AddressInfo addresses={address ? address.content : []} />
          )}

          {activeStep === 1 && <PaymentMethod />}

          {activeStep === 2 && (
            <OrderSummary
              totalPrice={totalPrice}
              cart={cart}
              address={selectedUserCheckoutAddress}
              paymentMethod={paymentMethod}
            />
          )}

          {activeStep === 3 && (
            <>
              {paymentMethod === "stripe" ? (
                <StripePayment />
              ) : (
                <PaypalPayment />
              )}
            </>
          )}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-400"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep == 0}
          onClick={() => handleBack()}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 ? (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
            className={`bg-amber-500 font-semibold px-6 h-10 rounded-md ${
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60"
                : ""
            }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        ) : (
          <button>Checkout</button>
        )}
      </div>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default Checkout;
