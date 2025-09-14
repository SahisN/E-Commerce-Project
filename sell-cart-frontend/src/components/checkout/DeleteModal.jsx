import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";
import React from "react";

const DeleteModal = ({ isOpen, setOpen, onDeleteHandler }) => {
  const deleteAddress = () => {
    setOpen(false);
    onDeleteHandler();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border rounded-lg bg-white p-12">
          <DialogTitle className="flex items-center font-bold">
            <MdOutlineWarning size={28} />
            This address will be delete permanently
          </DialogTitle>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setOpen(false)}
              className="py-1 px-2 border-2 rounded-md font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteAddress()}
              className="py-1 px-2 bg-red-500 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
