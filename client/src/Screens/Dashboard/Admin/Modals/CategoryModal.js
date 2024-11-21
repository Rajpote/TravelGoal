import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../../../../Components/usedInput";
import { useDispatch, useSelector } from "react-redux";
import { createCategoriesAction, getAllCategoriesAction, updateCategoriesAction } from "../../../../Redux/Actions/CategoriesAction";
import toast from "react-hot-toast";

function CategoryModal({ modalOpen, setModalOpen, category }) {
   const [title, setTitle] = useState("");
   const dispatch = useDispatch();
   const { isLoading, isError, isSuccess } = useSelector((state) => state.createCategory);
   const { isLoading: upLoading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.updateCategory);
   // submit category
   const submitHandler = (e) => {
      e.preventDefault();
      if (title) {
         if (category) {
            dispatch(updateCategoriesAction(category?._id, { title: title }));
            setModalOpen(!modalOpen);
         } else {
            dispatch(createCategoriesAction({ title: title }));
            setTitle("");
         }
         setModalOpen(false);
      } else {
         toast.error("Please enter a category title");
      }
   };

   // useEffect
   useEffect(() => {
      // ERROR
      if (upError || isError) {
         toast.error(upError || isError);
         dispatch({
            type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
         });
      }
      // SUCCESS
      if (isSuccess || upSuccess) {
         dispatch({
            type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
         });
         dispatch(getAllCategoriesAction());
      }
      // if category is not null set title to category title
      if (category) {
         setTitle(category?.title);
      }
      // if modal is closed set title to empty title
      if (modalOpen === false) {
         setTitle("");
      }
   }, [dispatch, isError, isLoading, isSuccess, upError, upLoading, upSuccess, category, modalOpen]);

   return (
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
         <div className="inline-block sm:w-4/5 md:w-3/5 lg:w-2/3 w-full h-full border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
            <h2 id="category-modal-title" className="text-3xl font-bold mb-4">
               {category ? "Update" : "Create"}
            </h2>
            <form className="flex flex-col gap-6 text-left mt-6" onSubmit={submitHandler}>
               <Input label="Category Name" placeholder={"Hiking"} type="text" value={title} onChange={(e) => setTitle(e.target.value)} bg={false} />
               <button disabled={isLoading || upLoading} type="submit" className="w-full flex-colo transitions py-3 font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">
                  {isLoading || upLoading ? "Loading...." : category ? "update" : "create"}
               </button>
            </form>
         </div>
      </MainModal>
   );
}

export default CategoryModal;
