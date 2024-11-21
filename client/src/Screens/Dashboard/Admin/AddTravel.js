import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/usedInput";
import Uploader from "../../../Components/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { travelValidation } from "../../../Components/Validation/travelValidation";
import { InlineError } from "../../../Components/Notifications/Error";
import toast from "react-hot-toast";
import { Imagepreview } from "../../../Components/Imagepreview";
import { createTravelAction } from "../../../Redux/Actions/TravelsAction";

function AddTravel() {
   const [imagewithoutTitle, setImageWithoutTitle] = useState("");
   const [imageTitle, setImageTitle] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // all categories
   const { categories } = useSelector((state) => state.getAllCategories);
   const { isLoading, isError, isSuccess } = useSelector((state) => state.createTravel);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(travelValidation),
   });

   // Handle form submission
   const onSubmit = async (data) => {
      const { latitude, longitude } = data;
      const location = {
         type: "Point",
         coordinates: [longitude, latitude], // Longitude first, then latitude
      };

      console.log({ ...data, imagewithoutTitle, imageTitle, location });

      dispatch(
         createTravelAction({
            ...data,
            image: imagewithoutTitle,
            titleImage: imageTitle,
            location, // Add location to the payload
         })
      );
   };

   // useEffect for handling navigation and toast notifications
   useEffect(() => {
      if (isSuccess) {
         reset({
            name: "",
            time: 0,
            year: 0,
            category: "",
            desc: "",
            latitude: "",
            longitude: "",
         });
         setImageTitle("");
         setImageWithoutTitle("");
         dispatch({ type: "CREATE_TRAVEL_RESET" });
         navigate("/addTravel");
      }

      if (isError) {
         toast.error(isError);
         dispatch({ type: "CREATE_TRAVEL_RESET" });
      }
   }, [isSuccess, isError, navigate, dispatch, reset]);

   return (
      <SideBar>
         <div className="flex flex-col gap-6 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">Add Travel</h2>
            <div className="w-full grid md:grid-cols-2 gap-6">
               <div className="w-full">
                  <Input label="Travel Title" placeholder="Pokhara" type="text" bg={true} className="w-full" name="name" register={register("name")} />
                  {errors.name && <InlineError className="text-red-500" text={errors.name.message} />}
               </div>
               <div className="w-full">
                  <Input label="Hours" placeholder="12" type="number" bg={true} className="w-full" name="time" register={register("time")} />
                  {errors.time && <InlineError text={errors.time.message} />}
               </div>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-6">
               <div className="col-span-2">
                  <Input label="Visited Year" placeholder="2012" type="number" bg={true} className="w-full" name="year" register={register("year")} />
                  {errors.year && <InlineError text={errors.year.message} />}
               </div>
            </div>

            {/* image */}
            <div className="w-full grid md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-6">
                  <p className="text-border font-semibol text-sm">Image Without Title</p>
                  <Uploader setImageUrl={setImageWithoutTitle} />
                  <Imagepreview image={imagewithoutTitle} name="imagewithoutTitle" />
               </div>
               {/* image with title */}
               <div className="flex flex-col gap-6">
                  <p className="text-border font-semibol text-sm">Image With Title</p>
                  <Uploader setImageUrl={setImageTitle} />
                  <Imagepreview image={imageTitle} name="imageTitle" />
               </div>
            </div>
            {/* Latitude and Longitude */}
            <div className="w-full grid md:grid-cols-2 gap-6">
               <div className="w-full">
                  <Input label="Latitude" placeholder="27.700769" type="number" bg={true} className="w-full" name="latitude" register={register("latitude")} />
                  {errors.latitude && <InlineError text={errors.latitude.message} />}
               </div>
               <div className="w-full">
                  <Input label="Longitude" placeholder="85.300140" type="number" bg={true} className="w-full" name="longitude" register={register("longitude")} />
                  {errors.longitude && <InlineError text={errors.longitude.message} />}
               </div>
            </div>
            {/* Description */}
            <div>
               <Message label="Description" name="desc" register={{ ...register("desc") }} bg={true} className="w-full" placeholder="make it short and sweet" />
               {errors.desc && <InlineError text={errors.desc.message} />}
            </div>
            {/* categories */}
            <div className="text-sm w-full">
               <Select label="Category" options={categories?.length > 0 ? categories : []} name="category" register={{ ...register("category") }} bg={true} />
               {errors.category && <InlineError text={errors.category.message} />}
            </div>
            {/* submit btn */}
            <button onClick={handleSubmit(onSubmit)} disabled={isLoading} className="bg-subMain w-full font-medium text-white py-4 rounded flex justify-center items-center">
               {isLoading ? "Please wait..." : <>Submit</>}
            </button>
         </div>
      </SideBar>
   );
}

export default AddTravel;
