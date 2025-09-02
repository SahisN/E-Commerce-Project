import { LuShoppingBag } from "react-icons/lu";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ItemContent from "../components/cart/ItemContent";
import CartEmpty from "../components/cart/CartEmpty";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };

  newCart.totalPrice = cart?.reduce(
    (acc, currentCart) =>
      acc * Number(currentCart?.specialPrice) * Number(currentCart?.quantity),
    0
  );

  if (!cart || cart.length === 0) return <CartEmpty />;

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <LuShoppingBag size={36} className="text-gray-700" />
          Shopping bag
        </h1>
        <p className="text-lg text-gray-600 mt-2">All of your selected items</p>
      </div>

      {/** Displaying cart item labels using grid layout */}
      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800 lg:ps-4">
          Price
        </div>
        <div className="justify-self-center text-lg text-slate-800 lg:ps-4">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-800 lg:ps-4">
          Total
        </div>
      </div>

      {/** Displaying cart items dynamically using CartItem component */}
      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, i) => <ItemContent key={i} {...item} />)}
      </div>

      <div className="border-t-[2px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div className=""></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>SubTotal</span>
            <span>$400</span>
          </div>
          <p className="text-slate-500">
            Tax and shipping calculated at checkout
          </p>

          {/** Check out button */}
          <Link className="w-full flex justify-end" to="/checkout">
            <button
              onClick={() => {}}
              className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-amber-400 flex items-center justify-center gap-2 hover:bg-amber-600 transition duration-500 ease-in-out"
            >
              <RiShoppingBag3Fill size={20} />
              Checkout
            </button>
          </Link>

          <Link
            className="flex gap-2 items-center mt-2 text-slate-500 hover:text-slate-800"
            to="/products"
          >
            <IoArrowBackCircle size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
