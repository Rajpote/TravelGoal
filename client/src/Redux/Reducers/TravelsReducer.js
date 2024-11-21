import * as TravelsConstants from "../Constants/TravelsConstants";

// get all travels
export const travelListReducer = (state = { travels: [] }, action) => {
   switch (action.type) {
      case TravelsConstants.TRAVELS_LIST_REQUEST:
         return { isLoading: true };
      case TravelsConstants.TRAVELS_LIST_SUCCESS:
         return { isLoading: false, travels: action.payload.travels, pages: action.payload.pages, page: action.payload.page, totalTravels: action.payload.totalTravels };
      case TravelsConstants.TRAVELS_LIST_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};

// get random travels
export const travelRandomReducer = (state = { travels: [] }, action) => {
   switch (action.type) {
      case TravelsConstants.TRAVELS_RANDOM_REQUEST:
         return { isLoading: true };
      case TravelsConstants.TRAVELS_RANDOM_SUCCESS:
         return { isLoading: false, travels: action.payload };
      case TravelsConstants.TRAVELS_RANDOM_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};

// get travels by id
export const travelDetailsReducer = (state = { travel: {} }, action) => {
   switch (action.type) {
      case TravelsConstants.TRAVEL_DETAILS_REQUEST:
         return { isLoading: true };
      case TravelsConstants.TRAVEL_DETAILS_SUCCESS:
         return { isLoading: false, travel: action.payload };
      case TravelsConstants.TRAVEL_DETAILS_FAIL:
         return { isLoading: false, isError: action.payload };
      case TravelsConstants.TRAVEL_DETAILS_RESET:
         return { travel: {} };
      default:
         return state;
   }
};

// get travels by rate
export const travelTopRatedReducer = (state = { travels: [] }, action) => {
   switch (action.type) {
      case TravelsConstants.TRAVELS_TOP_RATED_REQUEST:
         return { isLoading: true };
      case TravelsConstants.TRAVELS_TOP_RATED_SUCCESS:
         return { isLoading: false, travels: action.payload };
      case TravelsConstants.TRAVELS_TOP_RATED_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};

// create review
export const createReviewReducer = (state = {}, action) => {
   switch (action.type) {
      case TravelsConstants.CREATE_REVIEW_REQUEST:
         return { isLoading: true };
      case TravelsConstants.CREATE_REVIEW_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case TravelsConstants.CREATE_REVIEW_FAIL:
         return { isLoading: false, isError: action.payload };
      case TravelsConstants.CREATE_REVIEW_RESET:
         return {};
      default:
         return state;
   }
};

// DELETE TRAVEL
export const deleteTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case TravelsConstants.DELETE_TRAVEL_REQUEST:
         return { isLoading: true };
      case TravelsConstants.DELETE_TRAVEL_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case TravelsConstants.DELETE_TRAVEL_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};

// DELETE ALL travels
export const deleteAllTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case TravelsConstants.DELETE_ALL_TRAVELS_REQUEST:
         return { isLoading: true };
      case TravelsConstants.DELETE_ALL_TRAVELS_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case TravelsConstants.DELETE_ALL_TRAVELS_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};

// CREATE TRAVEL
export const createTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case TravelsConstants.CREATE_TRAVEL_REQUEST:
         return { isLoading: true };
      case TravelsConstants.CREATE_TRAVEL_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case TravelsConstants.CREATE_TRAVEL_FAIL:
         return { isLoading: false, isError: action.payload };
      case TravelsConstants.CREATE_TRAVEL_RESET:
         return {};
      default:
         return state;
   }
};

// update travel
export const updateTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case TravelsConstants.UPDATE_TRAVEL_REQUEST:
         return { isLoading: true };
      case TravelsConstants.UPDATE_TRAVEL_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case TravelsConstants.UPDATE_TRAVEL_FAIL:
         return { isLoading: false, isError: action.payload };
      case TravelsConstants.UPDATE_TRAVEL_RESET:
         return {};
      default:
         return state;
   }
};

export const travelRecommendationsReducer = (state = { recommendations: [] }, action) => {
   switch (action.type) {
      case TravelsConstants.TRAVEL_RECOMMENDATIONS_REQUEST:
         return { isLoading: true, recommendations: [] };
      case TravelsConstants.TRAVEL_RECOMMENDATIONS_SUCCESS:
         return { isLoading: false, recommendations: action.payload };
      case TravelsConstants.TRAVEL_RECOMMENDATIONS_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
};
