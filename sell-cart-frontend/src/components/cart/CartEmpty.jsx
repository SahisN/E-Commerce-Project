import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <MdShoppingCart size={80} className="mb-4 text-slate-500" />
        <h3 className="text-3xl font-bold slate-700">Your cart is empty</h3>
        <h5 className="text-xl text-slate-500 mt-2">
          Add some products to get started
        </h5>
      </div>
      <div className="mt-6">
        <Link
          to="/"
          className="flex gap-2 item-center text-blue-500 hover:text-blue-600 transition ease-in-out"
        >
          <MdArrowBack size={24} />
          <span className="font-medium">Start Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
