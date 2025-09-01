import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "../components/home/HeroBanner";
import ProductCard from "../components/shared/ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import Navbar from "../components/shared/Navbar";

const Homepage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      {/** Product Slide Show */}
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">
            Explore The Market Place
          </h1>
          <span className="text-slate-700 text-xl">
            Top rated products frequently bought
          </span>
        </div>

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          // Select Product List
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 8)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
