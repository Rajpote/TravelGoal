import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/usedInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";
import { registerAction } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Register() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userRegister);

   // Initialize react-hook-form with validation schema
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(RegisterValidation),
   });

   // Handle form submission
   const onSubmit = (data) => {
      dispatch(registerAction(data));
   };

   // useEffect for handling navigation and toast notifications
   useEffect(() => {
      if (userInfo?.isAdmin) {
         navigate("/dashboard");
      } else if (userInfo) {
         navigate("/profile");
      }

      if (isSuccess) {
         toast.success(`Welcome back, ${userInfo?.fullName}`);
         dispatch({ type: "USER_REGISTER_RESET" });
      }

      if (isError) {
         toast.error(isError);
         dispatch({ type: "USER_REGISTER_RESET" });
      }
   }, [userInfo, isSuccess, isError, navigate, dispatch]); // Dependency array

   return (
      <Layout>
         <div className="container mx-auto px-2 my-24 flex-colo">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border gap-8">
               <img src="/image/logo.png" alt="logo" className="w-full h-12 object-contain" />
               <div className="w-full">
                  <Input label="Full Name" name="fullName" register={register("fullName")} placeholder="Harry Potter" type="text" bg={true} />
                  {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
               </div>
               <div className="w-full">
                  <Input label="Email" name="email" register={register("email")} placeholder="example@gmail.com" type="email" bg={true} />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
               </div>
               <div className="w-full">
                  <Input label="Password" name="password" register={register("password")} placeholder="******" type="password" bg={true} />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
               </div>
               <button type="submit" disabled={isLoading} className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                  {isLoading ? (
                     <div className="loader"></div>
                  ) : (
                     <>
                        <FiLogIn /> Sign Up
                     </>
                  )}
               </button>
               <p className="text-center text-border">
                  Already have an account?{" "}
                  <Link to="/login" className="text-dryGray font-semibold ml-2">
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </Layout>
   );
}

export default Register;
