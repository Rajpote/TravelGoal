import * as UserConstants from "../Constants/userConstants";

// Login
export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.USER_LOGIN_REQUEST:
         return { isLoading: true };
      case UserConstants.USER_LOGIN_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case UserConstants.USER_LOGIN_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.USER_LOGIN_RESET:
         return {};
      case UserConstants.USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

// Register
export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.USER_REGISTER_REQUEST:
         return { isLoading: true };
      case UserConstants.USER_REGISTER_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case UserConstants.USER_REGISTER_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.USER_REGISTER_RESET:
         return {};
      default:
         return state;
   }
};

// userUpdateProfileReducer
export const userUpdateProfileReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.USER_UPDATE_PROFILE_REQUEST:
         return { isLoading: true };
      case UserConstants.USER_UPDATE_PROFILE_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case UserConstants.USER_UPDATE_PROFILE_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.USER_UPDATE_PROFILE_RESET:
         return {};
      default:
         return state;
   }
};

// userDeleteProfileReducer
export const userDeleteProfileReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.USER_DELETE_PROFILE_REQUEST:
         return { isLoading: true };
      case UserConstants.USER_DELETE_PROFILE_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case UserConstants.USER_DELETE_PROFILE_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.USER_DELETE_PROFILE_RESET:
         return {};
      default:
         return state;
   }
};

// change password
export const userChangePasswordReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.USER_CHANGE_PASSWORD_REQUEST:
         return { isLoading: true };
      case UserConstants.USER_CHANGE_PASSWORD_SUCCESS:
         return { isLoading: false, isSuccess: true, message: action.payload };
      case UserConstants.USER_CHANGE_PASSWORD_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.USER_CHANGE_PASSWORD_RESET:
         return {};
      default:
         return state;
   }
};

// GET FAVORITE TRAVELS
export const userGetFavoriteTravelReducer = (
   state = {
      likedTravels: [],
   },
   action
) => {
   switch (action.type) {
      case UserConstants.GET_FAVORITE_TRAVELS_REQUEST:
         return { isLoading: true };
      case UserConstants.GET_FAVORITE_TRAVELS_SUCCESS:
         return { isLoading: false, likedTravels: action.payload };
      case UserConstants.GET_FAVORITE_TRAVELS_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.GET_FAVORITE_TRAVELS_RESET:
         return {};
      default:
         return state;
   }
};

// DELETE FAVORITE TRAVELS
export const userDeleteFavoriteTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.DELETE_FAVORITE_TRAVELS_REQUEST:
         return { isLoading: true };
      case UserConstants.DELETE_FAVORITE_TRAVELS_SUCCESS:
         return { isLoading: false, likedTravels: action.payload, isSuccess: true };
      case UserConstants.DELETE_FAVORITE_TRAVELS_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.DELETE_FAVORITE_TRAVELS_RESET:
         return {};
      default:
         return state;
   }
};

// Adimin get all user
export const adminGetAllUserReducer = (
   state = {
      users: [],
   },
   action
) => {
   switch (action.type) {
      case UserConstants.GET_ALL_USERS_REQUEST:
         return { isLoading: true };
      case UserConstants.GET_ALL_USERS_SUCCESS:
         return { isLoading: false, users: action.payload };
      case UserConstants.GET_ALL_USERS_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.GET_ALL_USERS_RESET:
         return {
            users: [],
         };
      default:
         return state;
   }
};

// admin delete user
export const adminDeleteUserReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.DELETE_USER_REQUEST:
         return { isLoading: true };
      case UserConstants.DELETE_USER_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case UserConstants.DELETE_USER_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.DELETE_USER_RESET:
         return {};
      default:
         return state;
   }
};

// USER LIKE TRAVELS
export const userLikeTravelReducer = (state = {}, action) => {
   switch (action.type) {
      case UserConstants.LIKE_TRAVEL_REQUEST:
         return { isLoading: true };
      case UserConstants.LIKE_TRAVEL_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case UserConstants.LIKE_TRAVEL_FAIL:
         return { isLoading: false, isError: action.payload };
      case UserConstants.LIKE_TRAVEL_RESET:
         return {};
      default:
         return state;
   }
};

