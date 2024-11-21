import React from "react";
import Drawer from "@mui/material/Drawer";

function MainDrawer({ children, drawerOpen, closeDrawer }) {
   return (
      <Drawer
         open={drawerOpen}
         onClose={closeDrawer}
         anchor="right"
         variant="temporary" // You can use "permanent" or "persistent" if needed
         sx={{ width: 250, flexShrink: 0 }} // Adjust width as needed
      >
         {children}
      </Drawer>
   );
}

export default MainDrawer;
