import React from "react";
import { TailSpin } from "react-loader-spinner";
const LoaderSpinner = ({ size = 40 }) => {
  return (
    <TailSpin
      visible={true}
      height={size}
      width={size}
      strokeWidth={2}
      color="black"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoaderSpinner;
