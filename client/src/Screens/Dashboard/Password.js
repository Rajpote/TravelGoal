import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Input } from "../../Components/usedInput";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function Password() {
   const dispatch = useDispatch();
   const { isLoading, isError, message, isSuccess } = useSelector((state) => state.userchangepassword);

   // Initialize react-hook-form with validation schema
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(PasswordValidation),
   });
   // onsubmit
   const onsubmit = (data) => {
      dispatch(changePasswordAction(data));
   };

   useEffect(() => {
      if (isSuccess) {
         dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
      }

      if (isError) {
         toast.error(isError);
         dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
      }
      if (message && typeof message === "string") {
         toast.success(message);
         reset();
      }
   }, [isSuccess, isError, dispatch, message, reset]);

   return (
      <SideBar>
         <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">Change Password</h2>
            {/* Password Input */}
            <div className="w-full">
               <Input label="Previous Password" placeholder="Enter your Previous Password" type="password" bg={true} name="oldPassword" register={register("oldPassword")} />
               {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
            </div>
            {/* Password Input */}
            <div className="w-full">
               <Input label="New Password" placeholder="******" type="password" bg={true} name="newPassword" register={register("newPassword")} />
               {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
            </div>
            {/* Password Input */}
            <div className="w-full">
               <Input label="Confirm Password" placeholder="*****" type="password" bg={true} name="confirmPassword" register={register("confirmPassword")} />
               {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex justify-end items-center my-4">
               <button disabled={isLoading} type="submit" className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto">
                  {isLoading ? "Changing..." : "Change password"}
               </button>
            </div>
         </form>
      </SideBar>
   );
}

export default Password;
