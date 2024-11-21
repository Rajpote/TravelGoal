import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducer";
import * as travels from "./Reducers/TravelsReducer";

const rootReducer = combineReducers({
   // user reducer here
   userLogin: User.userLoginReducer,
   userRegister: User.userRegisterReducer,
   userUpdateProfile: User.userUpdateProfileReducer,
   userDeleteProfile: User.userDeleteProfileReducer,
   userchangepassword: User.userChangePasswordReducer,
   userGetFavoriteTravel: User.userGetFavoriteTravelReducer,
   userDeleteFavoriteTravel: User.userDeleteFavoriteTravelReducer,
   adminGetAllUser: User.adminGetAllUserReducer,
   adminDeleteUser: User.adminDeleteUserReducer,
   userLikeTravel: User.userLikeTravelReducer,

   // CATEGORY REDUCER
   getAllCategories: categories.getAllCategoriesReducer,
   createCategory: categories.createCategoryReducer,
   updateCategory: categories.updateCategoryReducer,
   deleteCategory: categories.deleteCategoryReducer,

   // TRAVELS REDUCER
   getAllTravels: travels.travelListReducer,
   getRandomTravels: travels.travelRandomReducer,
   getTravelByID: travels.travelDetailsReducer,
   getTopRatedTravels: travels.travelTopRatedReducer,
   createReview: travels.createReviewReducer,
   deleteTravel: travels.deleteTravelReducer,
   deleteAllTravels: travels.deleteAllTravelReducer,
   createTravel: travels.createTravelReducer,
   updateTravel: travels.updateTravelReducer,
   travelRecommendation: travels.travelRecommendationsReducer,
});

// get userInfo from local storage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// initial state
const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
   userForgotPassword: {}, // Add initial state for forgot password
   userResetPassword: {},
};

export const store = configureStore({
   reducer: rootReducer,
   preloadedState: initialState,
});
