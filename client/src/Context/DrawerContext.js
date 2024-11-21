import React, { createContext, useState } from "react";

export const SideBarContext = createContext();

function DrawerContext({ children }) {
   const [mobileDrawer, setMobileDrawer] = useState(false);
   const toggleDrawer = () => setMobileDrawer((prevState) => !prevState);

   const value = { mobileDrawer, toggleDrawer };

   return <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>;
}

export default DrawerContext;
