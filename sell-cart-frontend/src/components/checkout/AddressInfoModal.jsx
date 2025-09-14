import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

const AddressInfoModal = ({ isOpen, setOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-md mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
          <div className="py-6 px-6">{children}</div>

          <div className="flex justify-end gap-4 absolute right-4 top-2">
            <button onClick={() => setOpen(false)} type="button">
              <FaTimes className="text-slate-700" size={25} />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddressInfoModal;
