import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIs/CategoriesServices";
import toast from "react-hot-toast";
import { ErrorAction, tokenProtection } from "../Protection";

// get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
   try {
      dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
      const data = await categoriesAPIs.getCategoriesService();
      dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: data });
   } catch (error) {
      ErrorAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
   }
};

// create categories action
export const createCategoriesAction = (title) => async (dispatch, getState) => {
   try {
      dispatch({ type: CategoriesConstants.CREATE_CATEGORIES_REQUEST });
      await categoriesAPIs.createCategoryService(title, tokenProtection(getState));
      dispatch({ type: CategoriesConstants.CREATE_CATEGORIES_SUCCESS });
      toast.success("category created successfully");
   } catch (error) {
      ErrorAction(error, dispatch, CategoriesConstants.CREATE_CATEGORIES_FAIL);
   }
};

// update categories action
export const updateCategoriesAction = (id, title) => async (dispatch, getState) => {
   try {
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_REQUEST });
      await categoriesAPIs.updateCategoryService(id, title, tokenProtection(getState));
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORIES_SUCCESS });
      toast.success("category updated successfully");
      dispatch(getAllCategoriesAction);
   } catch (error) {
      ErrorAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORIES_FAIL);
   }
};

// delete categories action
export const deleteCategoriesAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_REQUEST });
      await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
      dispatch({ type: CategoriesConstants.DELETE_CATEGORIES_SUCCESS });
      toast.success("category deleted successfully");
      dispatch(getAllCategoriesAction);
   } catch (error) {
      ErrorAction(error, dispatch, CategoriesConstants.DELETE_CATEGORIES_FAIL);
   }
};
