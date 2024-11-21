import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploader from "../../Components/Uploader";
import { Input } from "../../Components/usedInput";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { deleteProfileAction, updateProfileAction } from "../../Redux/Actions/userActions";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import toast from "react-hot-toast";
import { Imagepreview } from "../../Components/Imagepreview";
import { USER_UPDATE_PROFILE_RESET } from "../../Redux/Constants/userConstants";

function Profile() {
   const dispatch = useDispatch();
   const { userInfo } = useSelector((state) => state.userLogin);
   const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
   const { isLoading, isError, isSuccess } = useSelector((state) => state.userUpdateProfile);
   const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile);

   // Initialize react-hook-form with validation schema
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(ProfileValidation),
   });

   // Update profile
   const onSubmit = async (data) => {
      dispatch(updateProfileAction({ ...data, image: imageUrl }));
   };
   // delete profile
   const deleteProfile = () => {
      window.confirm("Are you sure you want to delete your profile") && dispatch(deleteProfileAction());
   };

   // useEffect for handling navigation and toast notifications
   useEffect(() => {
      if (userInfo) {
         setValue("fullName", userInfo?.fullName);
         setValue("email", userInfo?.email);
      }
      if (isSuccess) {
         dispatch({ type: USER_UPDATE_PROFILE_RESET });
         toast.success("Profile updated successfully!");
      }
      if (isError || deleteError) {
         toast.error(isError || deleteError);
         dispatch({ type: "USER_DELETE_PROFILE_RESET" });
      }
   }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]); // Dependency array

   return (
      <SideBar>
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="w-full grid lg:grid-cols-12 gap-6">
               <div className="col-span-10">
                  <Uploader setImageUrl={setImageUrl} />
               </div>
               {/* image preview */}
               <Imagepreview image={imageUrl} name={userInfo ? userInfo.fullName : "TravelGoal"} />
            </div>
            <div className="w-full">
               <Input label="Full Name" name="fullName" register={register("fullName")} placeholder="Enter your full name" type="text" bg={true} />
               {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="w-full">
               <Input label="Email" name="email" register={register("email")} placeholder="example@gmail.com" type="email" bg={true} />
               {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-4">
               <button
                  onClick={deleteProfile}
                  disabled={deleteLoading || isLoading}
                  className="bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto"
               >
                  {deleteLoading ? "Deleting..." : "Delete Profile"}
               </button>
               <button disabled={deleteLoading || isLoading} type="submit" className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto">
                  {isLoading ? "Updating..." : "Update Profile"}
               </button>
            </div>
         </form>
      </SideBar>
   );
}

export default Profile;
