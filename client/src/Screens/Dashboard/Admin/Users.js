import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, getAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";

function Users() {
   const dispatch = useDispatch();
   const { isLoading, isError, users } = useSelector((state) => state.adminGetAllUser);
   const { isError: deleteError, isSuccess } = useSelector((state) => state.adminDeleteUser);

   // delete user handler
   const deleteUsersHandler = (id) => {
      window.confirm("are you sure you want to delete user") && dispatch(deleteUserAction(id));
   };
   useEffect(() => {
      dispatch(getAllUsersAction());
      if (isError || deleteError) {
         toast.error(isError || deleteError);
         dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
      }
   }, [dispatch, isError, deleteError, isSuccess]);
   return (
      <SideBar>
         <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Users</h2>
            {isLoading ? <Loader /> : users?.length > 0 ? <Table2 data={users} users={true} onDeleteFunction={deleteUsersHandler} /> : <Empty message="users not found" />}
         </div>
      </SideBar>
   );
}

export default Users;
