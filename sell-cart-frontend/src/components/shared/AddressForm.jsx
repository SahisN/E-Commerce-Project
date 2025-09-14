import InputField from "./InputField";
import LoaderSpinner from "./LoaderSpinner";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateUserAddress } from "../../store/actions";
import { useEffect } from "react";

const AddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { buttonLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addressSubmitHandler = async (data) => {
    dispatch(
      updateUserAddress(data, toast, address?.addressId, setOpenAddressModal)
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("zipcode", address?.zipcode);
      setValue("country", address?.country);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(addressSubmitHandler)} className="">
      <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
        <FaAddressCard className="text-slate-800" size={50} />
        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
          {address?.addressId ? "Edit Address" : "Add Address"}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <InputField
          label="Street"
          required
          id="street"
          type="text"
          message="Street Address is required"
          register={register}
          errors={errors}
        />

        <InputField
          label="Building Name"
          required
          id="buildingName"
          type="text"
          message="Enter Building Name"
          register={register}
          errors={errors}
        />

        <InputField
          label="City"
          required
          id="city"
          type="text"
          message="City is required"
          register={register}
          errors={errors}
        />

        <InputField
          label="State"
          required
          id="state"
          type="text"
          message="State is required"
          register={register}
          errors={errors}
        />

        <InputField
          label="Zipcode"
          required
          id="zipcode"
          type="text"
          message="Zipcode is required"
          register={register}
          errors={errors}
        />

        <InputField
          label="Country"
          required
          id="country"
          type="text"
          message="Country is required"
          register={register}
          errors={errors}
        />
      </div>
      <button
        disabled={buttonLoader}
        className={`bg-amber-400 flex gap-2 items-center justify-center font-semibold w-full py-2 transition-all duration-200 ease-in mt-[20px] ${
          buttonLoader ? "bg-slate-400" : "hover:bg-amber-600"
        }`}
        type="submit"
      >
        {buttonLoader ? (
          <>
            <LoaderSpinner size={25} />
            Adding...
          </>
        ) : (
          <>Add</>
        )}
      </button>
    </form>
  );
};

export default AddressForm;
