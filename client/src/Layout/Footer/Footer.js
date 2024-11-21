import React from "react";
import { Link } from "react-router-dom";

function Footer() {
   const Links = [
      {
         title: "Company",
         links: [
            { name: "Home", link: "/" },
            { name: "About us", link: "/about-us" },
            { name: "Contact us", link: "/contact-us" },
            { name: "Travels", link: "/travels" },
         ],
      },
      {
         title: "Top Categories",
         links: [
            { name: "Treking", link: "travel.category=Treking" },
            { name: "Hiking", link: "travel.category=Hiking" },
            { name: "Explore", link: "travel.category=Explore" },
            { name: "Adventure", link: "travel.category=Adventure" },
         ],
      },
      {
         title: "My Account",
         links: [
            { name: "Dashboard", link: "/dashboard" },
            { name: "My Favorites", link: "/favorites" },
            { name: "Profile", link: "/profile" },
            { name: "Change Password", link: "/password" },
         ],
      },
   ];

   return (
      <div className="bg-dry border-t-2 border-black py-6">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-5 py-10">
               {Links.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="col-span-1 md:col-span-2 lg:col-span-3">
                     <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                     <ul className="space-y-3">
                        {section.links.map((link, linkIndex) => (
                           <li key={linkIndex}>
                              <Link to={link.link} className="text-sm text-border hover:text-subMain transition-colors duration-300 ease-in-out">
                                 {link.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
               <div className="col-span-2 md:col-span-4 lg:col-span-3 flex flex-col items-start">
                  <Link to="/">
                     <img src="../image/logo.png" alt="logo" className="w-32 h-auto mb-4" />
                  </Link>
                  <p className="text-sm leading-6 text-border">
                     Leading Trael Recommendation System
                     <span className="block mt-2">Tel: 9811897922</span>
                     <span>Email: info@gmail.com</span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Footer;
