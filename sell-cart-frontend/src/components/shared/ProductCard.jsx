import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModel";
import { truncateText } from "../../utils/truncateText";
import { addToCart } from "../../store/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();
  const handleProductView = (product) => {
    console.log(product);
    setSelectedViewProduct(product);
    setOpenProductViewModal(true);
  };

  const addToCartHandler = (cartItems) => {
    console.log(cartItems);
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      {/** Product image **/}
      <div
        onClick={() =>
          handleProductView({
            productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          })
        }
        className="w-full overflow-hidden aspect-auto-[3/2]"
      >
        <img
          className="w-[432px] h-[288px] cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>
      {/** Product title **/}
      <div className="p-4">
        <h2
          onClick={() => {
            handleProductView({
              productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            });
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(productName, 30)}
        </h2>

        {/** Product description **/}
        <div className="min-h-20 max-h-20">
          <p className="text-gray-600">{truncateText(description, 80)}</p>
        </div>

        {/** Product Price **/}
        <div className="flex items-center justify-between">
          {specialPrice && price != specialPrice ? (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-xl font-bold text-slate-700">
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
              </span>
            </div>
          )}

          {/** Add to Cart Button */}
          <button
            disabled={!isAvailable || btnLoader}
            onClick={() =>
              addToCartHandler({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
              })
            }
            className={`bg-blue-500 ${
              isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
            } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
          >
            <FaShoppingCart className="mr-2" />
            {isAvailable ? "Add To Cart" : "Out Of Stock"}
          </button>
        </div>
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;
