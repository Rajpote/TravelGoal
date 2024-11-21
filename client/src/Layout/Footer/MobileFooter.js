import React, { useContext } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { SideBarContext } from "../../Context/DrawerContext";
import { useSelector } from "react-redux";

function MobileFooter() {
   const { mobileDrawer, toggleDrawer } = useContext(SideBarContext);
   const { userInfo } = useSelector((state) => state.userLogin);

   const active = "bg-white text-main";
   const inActive = "transition-all duration-300 ease-in-out text-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-white hover:text-main rounded-full p-3";

   const Hover = ({ isActive }) => (isActive ? `${active} ${inActive}` : inActive);
   const { likedTravels } = useSelector((state) => state.userGetFavoriteTravel);

   return (
      <>
         <div className="flex flex-col justify-between align-middle lg:flex h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
            <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
         </div>
         <footer className="lg:hidden fixed z-50 bottom-0 w-full px-3 py-2 bg-dry shadow-md">
            <div className="bg-gray-800 rounded-md flex justify-between items-center w-full py-2">
               <NavLink to="/travels" className={Hover}>
                  <BsCollectionPlay />
               </NavLink>
               <NavLink to="/favorites" className={Hover}>
                  <div className="relative">
                     <div className="w-5 h-5 flex items-center justify-center rounded-full text-xs bg-subMain text-white absolute -top-2 -right-2">
                        {likedTravels?.length > 0 ? likedTravels?.length : 0}
                     </div>
                     <FiHeart />
                  </div>
               </NavLink>
               <NavLink to={userInfo ? (userInfo?.isAdmin ? "/dashboard" : "/profile") : "/login"} className={Hover}>
                  <FiUserCheck />
               </NavLink>
               <button onClick={toggleDrawer} className={inActive}>
                  <CgMenuBoxed />
               </button>
            </div>
         </footer>
      </>
   );
}

export default MobileFooter;
