import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiLoginCircleFill } from "react-icons/ri";
import InputField from "../components/shared/InputField";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationSignInUser } from "../store/actions";
import toast from "react-hot-toast";

const Login = () => {
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

  const loginHandler = async (data) => {
    console.log("Login Click");
    dispatch(authenticationSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <RiLoginCircleFill className="text-slate-800" size={50} />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
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
            label="Password"
            required
            id="password"
            type="password"
            message="Password is required"
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
          {loader ? <>Loging in...</> : <>Login</>}
        </button>
        <p className="text-center text-sm text-slate-700 mt-[20px]">
          Don't have an account?{" "}
          <Link className="font-semibold underline hover:text-blue-600">
            <span>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
