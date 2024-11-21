import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/usedInput";
import Uploader from "../../../Components/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { travelValidation } from "../../../Components/Validation/travelValidation";
import { InlineError } from "../../../Components/Notifications/Error";
import toast from "react-hot-toast";
import { Imagepreview } from "../../../Components/Imagepreview";
import { getTravelByIdAction, updateTravelAction } from "../../../Redux/Actions/TravelsAction";
import Loader from "../../../Components/Notifications/Loader";
import { HiSelector } from "react-icons/hi";

function EditTravel() {
   const sameClass = "w-full gap-6 flex-colo min-h-screen";
   const [imagewithoutTitle, setImageWithoutTitle] = useState("");
   const [imageTitle, setImageTitle] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   // all categories
   const { categories } = useSelector((state) => state.getAllCategories);
   const { isLoading, isError, travel } = useSelector((state) => state.getTravelByID);
   const { isLoading: editLoading, isError: editError, isSuccess } = useSelector((state) => state.updateTravel);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(travelValidation),
   });

   // Handle form submission
   const onSubmit = async (data) => {
      const locationData = {
         type: "Point", // Setting the type to Point for GeoJSON
         coordinates: [data.longitude, data.latitude], // Storing longitude and latitude
      };
      const travelData = {
         ...data,
         image: imagewithoutTitle,
         titleImage: imageTitle,
         location: locationData, // Including the location in the travel data
      };
      dispatch(updateTravelAction(travel?._id, travelData)); // Dispatch update action
   };

   // useEffect for handling navigation and toast notifications
   useEffect(() => {
      if (travel?._id !== id) {
         dispatch(getTravelByIdAction(id));
      } else {
         setValue("name", travel?.name);
         setValue("time", travel?.time);
         setValue("year", travel?.year);
         setValue("category", travel?.category);
         setValue("desc", travel?.desc);
         setValue("latitude", travel?.latitude); // Set latitude
         setValue("longitude", travel?.longitude); // Set longitude
         setImageWithoutTitle(travel?.image);
         setImageTitle(travel?.titleImage);
      }
      if (isSuccess) {
         dispatch({ type: "UPDATE_TRAVEL_RESET" });
         navigate(`/edit/${id}`);
      }

      if (editError) {
         toast.error(isError);
         dispatch({ type: "UPDATE_TRAVEL_RESET" });
      }
   }, [dispatch, id, travel, setValue, isSuccess, editError, navigate, isError]);

   return (
      <SideBar>
         {isLoading ? (
            <Loader />
         ) : isError ? (
            <div className={sameClass}>
               <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <HiSelector />
               </div>
               <p className="text-border text-sm">{isError}</p>
            </div>
         ) : (
            <div className="flex flex-col gap-6 p-4 rounded-lg shadow-sm">
               <h2 className="text-xl font-bold">Edit "{travel?.name}"</h2>
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
               <button onClick={handleSubmit(onSubmit)} disabled={editLoading} className="bg-subMain w-full font-medium text-white py-4 rounded flex justify-center items-center">
                  {editLoading ? "Updating..." : <>Submit</>}
               </button>
            </div>
         )}
      </SideBar>
   );
}

export default EditTravel;
