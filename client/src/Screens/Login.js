import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/usedInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../Redux/Actions/userActions";
import { toast } from "react-toastify"; // Corrected import
import { InlineError } from "../Components/Notifications/Error";

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userLogin);

   // Initialize react-hook-form with validation schema
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(LoginValidation),
   });

   // Handle form submission
   const onSubmit = async (data) => {
      dispatch(loginAction(data));
   };

   // useEffect for handling navigation and toast notifications
   useEffect(() => {
      if (isSuccess) {
         if (userInfo?.isAdmin) {
            navigate("/dashboard");
         } else if (userInfo) {
            navigate("/profile");
         }
         toast.success(`Welcome back, ${userInfo?.fullName}`);
      }

      if (isError) {
         toast.error(isError);
         dispatch({ type: "USER_LOGIN_RESET" });
      }
   }, [userInfo, isSuccess, isError, navigate, dispatch]); // Dependency array

   return (
      <Layout>
         <div className="container mx-auto px-2 my-24 flex-colo">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 sm:p-14 flex-colo p-8 md:w-3/5 bg-dry rounded-lg border border-border gap-8">
               <img src="/image/logo.png" alt="logo" className="w-full h-12 object-contain" />

               {/* Email Input */}
               <div className="w-full">
                  <Input label="Email" name="email" register={register("email")} placeholder="example@gmail.com" type="email" bg={true} />
                  {errors.email && <InlineError text={errors.email.message} />}
               </div>

               {/* Password Input */}
               <div className="w-full">
                  <Input label="Password" placeholder="******" type="password" bg={true} name="password" register={register("password")} />
                  {errors.password && <InlineError text={errors.password.message} />}
               </div>

               {/* Forgot Password */}
               <p className="text-center text-border">
                  Forgot your password?{" "}
                  <Link to="/forgot" className="text-dryGray font-semibold ml-2">
                     Reset Here
                  </Link>
               </p>

               {/* Submit Button */}
               <button type="submit" disabled={isLoading} className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                  {isLoading ? (
                     <div className="loader"></div>
                  ) : (
                     <>
                        <FiLogIn /> Login
                     </>
                  )}
               </button>

               <p className="text-center text-border">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-dryGray font-semibold ml-2">
                     Sign Up
                  </Link>
               </p>
            </form>
         </div>
      </Layout>
   );
}

export default Login;