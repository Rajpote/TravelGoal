import * as TravelsConstants from "../Constants/TravelsConstants";
import * as travelsAPIs from "../APIs/TravelsService";
import { ErrorAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// get all travel action
export const getAllTravelsAction =
   ({ category = "", time = "", rate = "", year = "", search = "", pageNumber = "" }) =>
   async (dispatch) => {
      try {
         dispatch({ type: TravelsConstants.TRAVELS_LIST_REQUEST });
         // Make the API request with all parameters except location
         const response = await travelsAPIs.getAllTravelsService(category, time, rate, year, search, pageNumber);
         dispatch({ type: TravelsConstants.TRAVELS_LIST_SUCCESS, payload: response });
      } catch (error) {
         // Dispatch error action if something goes wrong
         ErrorAction(error, dispatch, TravelsConstants.TRAVELS_LIST_FAIL);
      }
   };

// get random travels action
export const getRandomTravelsAction = () => async (dispatch) => {
   try {
      dispatch({ type: TravelsConstants.TRAVELS_RANDOM_REQUEST });
      const response = await travelsAPIs.getRandomTravelsService();
      dispatch({ type: TravelsConstants.TRAVELS_RANDOM_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.TRAVELS_RANDOM_FAIL);
   }
};

// get travels by id action
export const getTravelByIdAction = (id) => async (dispatch) => {
   try {
      dispatch({ type: TravelsConstants.TRAVEL_DETAILS_REQUEST });
      const response = await travelsAPIs.getTravelByIdService(id);
      dispatch({ type: TravelsConstants.TRAVEL_DETAILS_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.TRAVEL_DETAILS_FAIL);
   }
};

// get top rated travels action
export const getTopRatedTravelsAction = () => async (dispatch) => {
   try {
      dispatch({ type: TravelsConstants.TRAVELS_TOP_RATED_REQUEST });
      const response = await travelsAPIs.getTopRatedTravelsService();
      dispatch({ type: TravelsConstants.TRAVELS_TOP_RATED_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.TRAVELS_TOP_RATED_FAIL);
   }
};

// review travel action
export const reviewTravelAction =
   ({ id, review }) =>
   async (dispatch, getState) => {
      try {
         dispatch({ type: TravelsConstants.CREATE_REVIEW_REQUEST });
         const response = await travelsAPIs.reviewTravelService(tokenProtection(getState), id, review);
         dispatch({ type: TravelsConstants.CREATE_REVIEW_SUCCESS, payload: response });
         toast.success("review added successfully");
         dispatch({ type: TravelsConstants.CREATE_REVIEW_RESET });
         dispatch(getTravelByIdAction(id));
      } catch (error) {
         ErrorAction(error, dispatch, TravelsConstants.CREATE_REVIEW_FAIL);
      }
   };

// delete travel action
export const deleteTravelAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: TravelsConstants.DELETE_TRAVEL_REQUEST });
      const response = await travelsAPIs.deleteTravelService(tokenProtection(getState), id);
      dispatch({ type: TravelsConstants.DELETE_TRAVEL_SUCCESS, payload: response });
      toast.success("Travel deleted successfully");
      dispatch(getAllTravelsAction({}));
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.DELETE_TRAVEL_FAIL);
   }
};

// delete all travel action
export const deleteAllTravelAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: TravelsConstants.DELETE_ALL_TRAVELS_REQUEST });
      const response = await travelsAPIs.deleteAllTravelService(tokenProtection(getState));
      dispatch({ type: TravelsConstants.DELETE_ALL_TRAVELS_SUCCESS, payload: response });
      toast.success("All travels deleted successfully");
      dispatch(getAllTravelsAction({}));
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.DELETE_ALL_TRAVELS_FAIL);
   }
};

// create travel action
export const createTravelAction = (travel) => async (dispatch, getState) => {
   try {
      dispatch({ type: TravelsConstants.CREATE_TRAVEL_REQUEST });
      const response = await travelsAPIs.createTravelService(tokenProtection(getState), travel);
      dispatch({ type: TravelsConstants.CREATE_TRAVEL_SUCCESS, payload: response });
      toast.success("Travel created successfully");
      // dispatch(getAllTravelsAction({}));
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.CREATE_TRAVEL_FAIL);
   }
};

// update travel action
export const updateTravelAction = (id, travel) => async (dispatch, getState) => {
   try {
      dispatch({ type: TravelsConstants.UPDATE_TRAVEL_REQUEST });
      const response = await travelsAPIs.updateTravelService(tokenProtection(getState), id, travel);
      dispatch({ type: TravelsConstants.UPDATE_TRAVEL_SUCCESS, payload: response });
      toast.success("Travel updated successfully");
      dispatch(getAllTravelsAction({}));
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.UPDATE_TRAVEL_FAIL);
   }
};

export const getTravelRecommendationsAction = (id, travel) => async (dispatch, getState) => {
   try {
      dispatch({ type: TravelsConstants.TRAVEL_RECOMMENDATIONS_REQUEST });
      const response = await travelsAPIs.getTravelRecommendationsService(tokenProtection(getState), id, travel);
      dispatch({
         type: TravelsConstants.TRAVEL_RECOMMENDATIONS_SUCCESS,
         payload: response,
      });
      // toast.success("Recommendations fetched successfully");
   } catch (error) {
      ErrorAction(error, dispatch, TravelsConstants.TRAVEL_RECOMMENDATIONS_FAIL);
   }
};
