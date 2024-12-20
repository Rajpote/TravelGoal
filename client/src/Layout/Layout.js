import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";

function Layout({ children }) {
   return (
      <>
         <div className="bg-main text-white px-10">
            <Navbar />
            {children}
            <Footer />
            {/* mobile footer */}
            <MobileFooter />
         </div>
      </>
   );
}

export default Layout;
