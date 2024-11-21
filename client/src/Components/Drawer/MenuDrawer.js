import React from "react";
import MainDrawer from "./MainDrawer";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaMedium } from "react-icons/fa";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";

function MenuDrawer({ drawerOpen, toggleDrawer }) {
   const active = "bg-dry text-subMain shadow-lg";
   const hover = "hover:bg-dry hover:text-white transition-colors duration-300 ease-in-out";
   const inActive = "rounded-lg sm:gap-10 font-semibold text-base flex items-center gap-3 py-4 px-4 sm:px-8 transition-all duration-300 ease-in-out";
   const Hover = `${inActive} ${hover}`;

   const Links = [
      {
         name: "Travel",
         path: "/travels",
         icon: BsCollectionPlay,
      },
      {
         name: "About Us",
         path: "/about-us",
         icon: HiOutlineUserGroup,
      },
      {
         name: "Contact Us",
         path: "/contact-us",
         icon: BiPhoneCall,
      },
   ];

   const LinkDatas = [
      {
         icon: FaFacebook,
         link: "https://www.facebook.com",
      },
      {
         icon: FaMedium,
         link: "https://www.medium.com",
      },
      {
         icon: FaLinkedin,
         link: "https://www.linkedin.com",
      },
   ];

   return (
      <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
         <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
            <div className="w-full flex-btn h-16 px-6 py-4 bg-dry relative">
               <Link onClick={toggleDrawer} to="/">
                  <img className="w-28 h-28 object-contain" src="/image/logo.png" alt="logo" />
               </Link>
               <div className="absolute right-5 top-5 z-50">
                  <button
                     onClick={toggleDrawer}
                     className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
                     type="button"
                     aria-label="Close modal"
                  >
                     <IoClose />
                  </button>
               </div>
            </div>
            <div className="w-full overflow-y-scroll flex-grow max-height-full">
               <div className="pb-12 pt-4">
                  {Links.map((link, index) => (
                     <NavLink to={link.path} key={index} onClick={toggleDrawer} className={({ isActive }) => (isActive ? `${Hover} ${active}` : Hover)}>
                        <link.icon className="text-lg" /> {link.name}
                     </NavLink>
                  ))}
               </div>
               <div className="flex-rows gap-6 w-full">
                  {LinkDatas.map((link, index) => (
                     <a href={link.link} key={index} target="_blank" rel="noreferrer" className="flex-colo w-12 h-12 transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30">
                        <link.icon />
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </MainDrawer>
   );
}

export default MenuDrawer;
