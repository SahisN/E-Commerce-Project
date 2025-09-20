import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../components/shared/InputField";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import LoaderSpinner from "../components/shared/LoaderSpinner";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { signUpNewUser } from "../store/actions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const signupHandler = async (data) => {
    console.log("Login Click");
    dispatch(signUpNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <RiShoppingBag2Fill className="text-slate-800" size={50} />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Sign up
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="Username is required"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="Email is required"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="Password is required"
            min={6}
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className={`bg-amber-400 flex gap-2 items-center justify-center font-semibold w-full py-2 transition-all duration-200 ease-in mt-[20px] ${
            loader ? "bg-slate-400" : "hover:bg-amber-600"
          }`}
          type="submit"
        >
          {loader ? (
            <>
              <LoaderSpinner size={25} />
              Signing in...
            </>
          ) : (
            <>Sign up</>
          )}
        </button>
        <p className="text-center text-sm text-slate-700 mt-[20px]">
          Already Have an Account?{" "}
          <Link
            className="font-semibold underline hover:text-blue-600"
            to="/login"
          >
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
