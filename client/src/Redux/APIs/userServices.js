import api from "./Axios";

// ************ Public apis ***************

// Register new user call api
const registerService = async (user) => {
   try {
      const { data } = await api.post("/users", user); // Ensure this matches your backend route
      if (data) {
         localStorage.setItem("userInfo", JSON.stringify(data));
      }
      return data;
   } catch (error) {
      console.error("Error registering user:", error);
      throw error;
   }
};

// Logout user function
const logoutService = () => {
   localStorage.removeItem("userInfo");
   return null;
};

// Login user
const loginService = async (user) => {
   try {
      const { data } = await api.post("/users/login", user);
      if (data) {
         localStorage.setItem("userInfo", JSON.stringify(data));
      }
      return data;
   } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while logging in. Please try again.";
      alert(errorMessage);
      console.error("Error logging in user:", error.response?.data || error.message);
      throw error;
   }
};

// ************ private apis ***************

// Update profile API call
const updateProfileService = async (user, token) => {
   try {
      const { data } = await api.put("/users", user, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      if (data) {
         localStorage.setItem("userInfo", JSON.stringify(data));
      }
      return data;
   } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
   }
};

// delete profile api call
const deleteProfileService = async (token) => {
   const { data } = await api.delete("/users", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (data) {
      localStorage.removeItem("userInfo");
   }
   return data;
};

// change password
const changePasswordService = async (passwords, token) => {
   try {
      const { data } = await api.put("/users/password", passwords, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return data;
   } catch (error) {
      console.error("Error changing password:", error);
      throw error;
   }
};

// get all favorites travel
const getFavoriteTravel = async (token) => {
   const { data } = await api.get("/users/favorites", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// delete all favorites travel
const deleteFavoriteTravel = async (token) => {
   const { data } = await api.delete("/users/favorites", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// liked travel
const likeTravelService = async (travelId, token) => {
   const { data } = await api.post(
      `/users/favorites`,
      travelId, // Send travelId in an object
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

// ************ Admin apis ***************

// admin get all user
const getAllUserService = async (token) => {
   const { data } = await api.get("/users", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// admin delete user
const deleteUserService = async (id, token) => {
   const { data } = await api.delete(`/users/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};



export {
   registerService,
   logoutService,
   loginService,
   updateProfileService,
   deleteProfileService,
   changePasswordService,
   getFavoriteTravel,
   deleteFavoriteTravel,
   getAllUserService,
   deleteUserService,
   likeTravelService,
};
