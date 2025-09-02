import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import { toast } from "react-hot-toast";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();
  const handleQuantityIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(
        cartItems,
        toast,
        currentQuantity,
        setCurrentQuantity
      )
    );
  };

  const handleQuantityDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const newQuantity = quantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    } else {
      removeItemFromCart(cartItems);
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-200 py-4 px-2">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm semibold text-slate-600">
            {productName}
          </h3>
        </div>

        <div className="md:w-40 sm:w-26 w-12">
          <img
            src={image}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() =>
                removeItemFromCart({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs bg-red-600 text-slate-200 border border-rose-600 rounded-md hover:bg-red-800 transition duration-200 ease-in-out"
            >
              <HiOutlineTrash size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/** Display price */}
      <div className="justify-self-center lg-text-[17px] text-sm text-slate-600 font-semibold">
        {Number(specialPrice)}
      </div>

      {/** Display quantity */}
      <div className="justify-self-center lg-text-[17px] text-sm text-slate-600 font-semibold">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQuantityIncrease={() =>
            handleQuantityIncrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
            })
          }
          handleQuantityDecrease={() =>
            handleQuantityDecrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
            })
          }
        />
      </div>

      {/** Display total*/}
      <div className="justify-self-center lg-text-[17px] text-sm text-slate-600 font-semibold">
        {Number(currentQuantity) * Number(specialPrice)}
      </div>
    </div>
  );
};

export default ItemContent;
