import { Badge, IconButton } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        {/** Navbar home icon */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FiShoppingCart className="mr-2 text-3xl" />
          <span className="font-[Poppins]">Sell Cart</span>
        </Link>

        {/** Navbar page navigation */}
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h2-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          } transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 py-1 sm:px-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <Link
              to="/"
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-300"
              }`}
            >
              Home
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              to="/products"
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              Products
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              to="/about"
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              About
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              to="/contact"
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              Contact
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              to="/cart"
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              <Badge
                showZero
                badgeContent={cart?.length || 0}
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <FaShoppingCart size={21} />
              </Badge>
            </Link>
          </li>
          {user && user.id ? (
            <li className="font-[500] transition-all duration-150">
              <UserMenu />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
              <Link
                to="/Login"
                className="flex items-center space-x-2 px-4 bg-amber-400 text-black rounded py-1 hover:bg-amber-600"
              >
                <FiLogIn />
                Login
              </Link>
            </li>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross1 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
