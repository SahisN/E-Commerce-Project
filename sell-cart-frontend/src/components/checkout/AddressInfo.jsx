import { FaAddressCard } from "react-icons/fa";
import Loader from "../shared/Loader";
import { useState } from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddressForm from "../shared/AddressForm";

const AddressInfo = () => {
  const noAddressExist = true;
  const isLoading = false;
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div>
          <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
            <FaAddressCard size={50} className="text-gray-500 mb-4" />

            <h1 className="mb-2 text-slate-800 text-center font-bold text-2xl">
              Address Not Found
            </h1>

            <p className="mb-2 text-slate-600 text-center">
              Please add your address to complete purchase
            </p>

            <button
              className="px-4 py-2 mt-4 bg-amber-400 font-medium rounded-md hover:bg-amber-500 transition-all ease-in duration-150"
              onClick={addNewAddressHandler}
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="space-y-4 pt-6"> Address List</div>
          )}
        </div>
      )}

      <AddressInfoModal isOpen={openAddressModal} setOpen={setOpenAddressModal}>
        <AddressForm />
      </AddressInfoModal>
    </div>
  );
};

export default AddressInfo;
