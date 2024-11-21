import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";

function Navbar() {
   const [search, setSearch] = useState("");
   const navigate = useNavigate();
   const { userInfo } = useSelector((state) => state.userLogin);
   const { likedTravels } = useSelector((state) => state.userGetFavoriteTravel);

   const hover = "hover:text-subMain transition text-white";
   const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

   const handleSearch = (e) => {
      e.preventDefault();
      if (search.trim()) {
         navigate(`/travels/${search}`);
         setSearch(search);
      } else {
         navigate(`/travels`);
      }
   };
   return (
      <>
         <div className="bg-main shadow-md sticky top-0 z-20">
            <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
               <div className="col-span-1 lg:block hidden">
                  <Link to="/">
                     <img src="../image/logo.png" alt="logo" className="w-full h-12 object-contain" />
                  </Link>
               </div>
               {/* search form */}
               <div className="col-span-3">
                  <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex items-center gap-4">
                     <button type="submit" className="bg-subMain w-12 flex items-center justify-center h-12 rounded text-white">
                        <FaSearch />
                     </button>
                     <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
                     />
                  </form>
               </div>
               {/* Navigation Links */}
               <div className="col-span-3 font-medium text-sm hidden xl:flex xl:gap-14 2xl:gap-20 justify-between lg:justify-end items-center">
                  <NavLink to="/travels" className={Hover}>
                     Travel
                  </NavLink>
                  <NavLink to="/about-us" className={Hover}>
                     About Us
                  </NavLink>
                  <NavLink to="/contact-us" className={Hover}>
                     Contact Us
                  </NavLink>
                  <NavLink to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"} className={Hover}>
                     {userInfo ? (
                        <img src={userInfo?.image ? userInfo.image : "/image/user.png"} alt={userInfo?.fullName} className="w-8 h-8 rounded-full border border-subMain object-cover" />
                     ) : (
                        <CgUser className="w-8 h-8" />
                     )}
                  </NavLink>
                  <NavLink to="/favorites" className={`${Hover} relative`}>
                     <FaHeart className="w-6 h-6" />
                     <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">{likedTravels?.length || 0}</div>
                  </NavLink>
               </div>
            </div>
         </div>
      </>
   );
}

export default Navbar;
