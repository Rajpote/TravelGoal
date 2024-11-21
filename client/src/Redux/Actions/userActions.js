import * as userConstants from "../Constants/userConstants";
import * as travelConstants from "../Constants/TravelsConstants";
import * as categoriesConstants from "../Constants/CategoriesConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorAction, tokenProtection } from "../Protection";

// login action
const loginAction = (datas) => async (dispatch) => {
   try {
      dispatch({ type: userConstants.USER_LOGIN_REQUEST });
      const response = await userApi.loginService(datas);
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
   }
};
// Register action
const registerAction = (datas) => async (dispatch) => {
   try {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const response = await userApi.registerService(datas);
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
   }
};

// logout action
const logoutAction = () => (dispatch) => {
   userApi.logoutService();
   dispatch({ type: userConstants.USER_LOGOUT });
   dispatch({ type: userConstants.USER_LOGOUT_RESET });
   dispatch({ type: userConstants.USER_REGISTER_RESET });
   dispatch({ type: userConstants.DELETE_FAVORITE_TRAVELS_RESET });
   dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
   dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
   dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
   dispatch({ type: userConstants.GET_FAVORITE_TRAVELS_RESET });
   dispatch({ type: userConstants.GET_ALL_USERS_RESET });
   dispatch({ type: userConstants.DELETE_USER_RESET });
   dispatch({ type: userConstants.LIKE_TRAVEL_RESET });
   dispatch({ type: travelConstants.TRAVEL_DETAILS_RESET });
   dispatch({ type: travelConstants.CREATE_REVIEW_RESET });
   dispatch({ type: travelConstants.CREATE_TRAVEL_RESET });
   dispatch({ type: travelConstants.UPDATE_TRAVEL_RESET });
   dispatch({ type: categoriesConstants.CREATE_CATEGORIES_RESET });
   dispatch({ type: categoriesConstants.UPDATE_CATEGORIES_RESET });
   dispatch({ type: categoriesConstants.DELETE_CATEGORIES_RESET });
};

// Update Profile Action
const updateProfileAction = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
      const response = await userApi.updateProfileService(user, tokenProtection(getState));
      // Dispatching profile update success action
      dispatch({
         type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
         payload: response,
      });
      // Update user login info in the state with the new profile data
      dispatch({
         type: userConstants.USER_LOGIN_SUCCESS,
         payload: response,
      });
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
   }
};

// deleteProfileAction
const deleteProfileAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
      await userApi.deleteProfileService(tokenProtection(getState));
      dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
      toast.success("Profile Deleted");
      dispatch(logoutAction());
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
   }
};

// changePasswordAction
const changePasswordAction = (passwords) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });

      // Get the token and make the API call to change the password
      const response = await userApi.changePasswordService(passwords, tokenProtection(getState));

      // Dispatch success action with the response payload
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });

      // Show a success toast
      toast.success("Password changed successfully");
   } catch (error) {
      // Handle errors using the ErrorAction function
      ErrorAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
   }
};

// get all getFavoriteTravelsAction action
const getFavoriteTravelsAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.GET_FAVORITE_TRAVELS_REQUEST });
      const response = await userApi.getFavoriteTravel(tokenProtection(getState));
      dispatch({ type: userConstants.GET_FAVORITE_TRAVELS_SUCCESS, payload: response });
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.GET_FAVORITE_TRAVELS_FAIL);
   }
};

// delete all deleteFavoriteTravelsAction action
const deleteFavoriteTravelsAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.DELETE_FAVORITE_TRAVELS_REQUEST });
      await userApi.deleteFavoriteTravel(tokenProtection(getState));
      dispatch({ type: userConstants.DELETE_FAVORITE_TRAVELS_SUCCESS });
      toast.success("Favorite travels deleted successfully");
   } catch (error) {
      dispatch({ type: userConstants.DELETE_FAVORITE_TRAVELS_FAIL, payload: error.message });
      toast.error(error.message);
   }
};

// admin get all USER action
const getAllUsersAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
      const response = await userApi.getAllUserService(tokenProtection(getState));
      dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
      // toast.success("Favorite travels deleted successfully");
   } catch (error) {
      dispatch({ type: userConstants.GET_ALL_USERS_FAIL, payload: error.message });
      toast.error(error.message);
   }
};
// admin delete USER action
const deleteUserAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.DELETE_USER_REQUEST });
      await userApi.deleteUserService(id, tokenProtection(getState));
      dispatch({ type: userConstants.DELETE_USER_SUCCESS });
      toast.success("user deleted");
   } catch (error) {
      dispatch({ type: userConstants.DELETE_USER_FAIL, payload: error.message });
      toast.error(error.message);
   }
};

// user like travel action
const likeTravelAction = (travelId) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.LIKE_TRAVEL_REQUEST });
      const response = await userApi.likeTravelService(travelId, tokenProtection(getState));
      dispatch({
         type: userConstants.LIKE_TRAVEL_SUCCESS,
         payload: response,
      });
      toast.success("Travel Added in favorites");
      dispatch(getFavoriteTravelsAction());
   } catch (error) {
      ErrorAction(error, dispatch, userConstants.LIKE_TRAVEL_FAIL);
   }
};



export {
   loginAction,
   registerAction,
   logoutAction,
   updateProfileAction,
   deleteProfileAction,
   changePasswordAction,
   getFavoriteTravelsAction,
   deleteFavoriteTravelsAction,
   getAllUsersAction,
   deleteUserAction,
   likeTravelAction,
};
