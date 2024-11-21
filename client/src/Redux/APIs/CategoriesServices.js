import api from "./Axios";

// ************ Public apis ***************
// get all categories Api
const getCategoriesService = async () => {
   const { data } = await api.get("/categories");
   return data;
};

// ************ Admin apis ***************
// create a new categories API
const createCategoryService = async (title, token) => {
   const { data } = await api.post("/categories", title, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// delete a new categories API
const deleteCategoryService = async (id, token) => {
   const { data } = await api.delete(`/categories/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// update a new categories API
const updateCategoryService = async (id, title, token) => {
   const { data } = await api.put(`/categories/${id}`, title, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

export { getCategoriesService, createCategoryService, deleteCategoryService, updateCategoryService };
