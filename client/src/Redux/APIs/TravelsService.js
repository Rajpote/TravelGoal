import api from "./Axios";

// public apis

// get all travel
export const getAllTravelsService = async (category, time, rate, year, search, pageNumber) => {
   let url = `/travels?category=${category}&time=${time}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`;

   const { data } = await api.get(url);
   return data;
};

// get random travels function
export const getRandomTravelsService = async () => {
   const { data } = await api.get(`travels/random/all`);
   return data;
};

// get travel by id function
export const getTravelByIdService = async (id) => {
   const { data } = await api.get(`/travels/${id}`);
   return data;
};

// get top rated travel function
export const getTopRatedTravelsService = async () => {
   const { data } = await api.get(`/travels/rated/top`);
   return data;
};

// review travel function
export const reviewTravelService = async (token, id, review) => {
   const { data } = await api.post(`/travels/${id}/reviews`, review, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// delete travel function
export const deleteTravelService = async (token, id) => {
   const { data } = await api.delete(`/travels/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// delete all movie function
export const deleteAllTravelService = async (token) => {
   const { data } = await api.delete(`/travels`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// create travel function
export const createTravelService = async (token, travel) => {
   const { data } = await api.post(`/travels`, travel, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

// update travel function
export const updateTravelService = async (token, id, travel) => {
   const { data } = await api.put(`/travels/${id}`, travel, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};

export const getTravelRecommendationsService = async (token, id) => {
   const { data } = await api.get(`/travels/recommendations/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return data;
};
