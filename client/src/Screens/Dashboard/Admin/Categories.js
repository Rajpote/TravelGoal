import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "./Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoriesAction } from "../../../Redux/Actions/CategoriesAction";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import toast from "react-hot-toast";

function Categories() {
   const [modalOpen, setModalOpen] = useState(false);
   const [category, setCategory] = useState();
   const dispatch = useDispatch();

   // all categories
   const { categories, isLoading } = useSelector((state) => state.getAllCategories);

   // delete category
   const { isSuccess, isError } = useSelector((state) => state.deleteCategory);
   const adminDeleteCategory = (id) => {
      if (window.confirm("Are sure you want to delete category")) {
         dispatch(deleteCategoriesAction(id));
      }
   };
   const OnEditFunction = (id) => {
      setCategory(id);
      setModalOpen(!modalOpen);
   };

   useEffect(() => {
      if (isError) {
         toast.error(isError);
         dispatch({ type: "DELETE_CATEGORY_RESET" });
      }
      if (isSuccess) {
         dispatch({ type: "DELETE_CATEGORY_RESET" });
      }
      if (modalOpen === false) {
         setCategory();
      }
   }, [modalOpen, dispatch, isError, isSuccess]);

   return (
      <SideBar>
         {/* Modal for creating categories */}
         <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} />

         <div className="flex flex-col gap-6 p-4">
            {/* Header with button to open modal */}
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold">Categories</h2>
               <button onClick={() => setModalOpen(true)} className="bg-subMain flex items-center gap-2 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded">
                  <HiPlus className="text-lg" /> Create
               </button>
            </div>
            {isLoading ? (
               <Loader />
            ) : categories?.length > 0 ? (
               <Table2 data={categories} users={false} OnEditFunction={OnEditFunction} onDeleteFunction={adminDeleteCategory} />
            ) : (
               <Empty message="No Category found" />
            )}
         </div>
      </SideBar>
   );
}

export default Categories;
