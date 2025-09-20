import ProductCard from "../components/shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions";
import { useEffect } from "react";
import Filter from "../components/products/Filter";
import useProductFilter from "../hook/useProductFilter";
import Loader from "../components/shared/Loader";
import Paginations from "../components/shared/Paginations";
import ErrorMessage from "../components/shared/ErrorMessage";

const Product = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2x1:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader message={"Fetching Products..."} />
      ) : errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>

          {products.length == 0 && (
            <p className="text-center text-xl text-slate-600">
              No Products Found
            </p>
          )}

          {/** Product Result divider */}
          <div className="flex justify-center pt-10">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProduct={pagination?.totalElements}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
