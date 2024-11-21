import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";
import { deleteTravelAction } from "../../../Redux/Actions/TravelsAction";

function Dashboard() {
   const dispatch = useDispatch();
   const { isLoading: catLoading, isError: catError, categories } = useSelector((state) => state.getAllCategories);
   const { isLoading: userLoading, isError: userError, users } = useSelector((state) => state.adminGetAllUser);
   const { isLoading, isError, travels, totalTravels } = useSelector((state) => state.getAllTravels);
   // delete travel
   const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteTravel);
   // delete travel handler
   const deleteTravelHandler = (id) => {
      window.confirm("are you sure you want to delete travel") && dispatch(deleteTravelAction(id));
   };
   // useEffect
   useEffect(() => {
      dispatch(getAllUsersAction());
      if (isError || catError || userError || deleteError) {
         toast.error("something went wrong");
      }
   }, [dispatch, isError, catError, userError, deleteError]);
   const dashboardData = [
      {
         bg: "bg-orange-600",
         icon: FaRegListAlt,
         title: "Total Travels",
         total: isLoading ? "loading..." : totalTravels || 0,
      },
      {
         bg: "bg-blue-600",
         icon: HiViewGridAdd,
         title: "Total Categories",
         total: catLoading ? "loading..." : categories?.length || 0,
      },
      {
         bg: "bg-green-600",
         icon: FaUser,
         title: "Total Users",
         total: userLoading ? "loading..." : users?.length || 0,
      },
   ];

   return (
      <SideBar>
         <h2 className="text-xl font-bold">Dashboard</h2>
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {dashboardData.map((data, i) => (
               <div key={i} className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
                  <div className={`col-span-1 rounded-full h-12 w-12 flex items-center justify-center ${data.bg}`}>
                     <data.icon className="text-white text-2xl" />
                  </div>
                  <div className="col-span-3 flex flex-col justify-center">
                     <h3 className="text-lg font-semibold text-white">{data.title}</h3>
                     <p className="text-text font-bold mt-2">{data.total}</p>
                  </div>
               </div>
            ))}
         </div>
         <h3 className="text-md font-medium my-6 text-border">Recent Travel</h3>
         {isLoading || deleteLoading ? <Loader /> : travels.length > 0 ? <Table data={travels?.slice(0, 5)} admin={true} onDeleteHandler={deleteTravelHandler} /> : <Empty message="No Travel found" />}
      </SideBar>
   );
}

export default Dashboard;
