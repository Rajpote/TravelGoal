import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import HomeScreen from "./Screens/HomeScreen";
import NotFound from "./Screens/NotFound";
import TravelsPage from "./Screens/TravelsPage";
import SingleTravel from "./Screens/SingleTravel";
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Password from "./Screens/Dashboard/Password";
import FavoritesTravel from "./Screens/Dashboard/FavoritesTravel";
import TravelList from "./Screens/Dashboard/Admin/TravelList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Users from "./Screens/Dashboard/Admin/Users";
import AddTravel from "./Screens/Dashboard/Admin/AddTravel";
import ScrollToTop from "./ScrollToTop";
import DrawerContext from "./Context/DrawerContext";
import ToastContainer from "./Components/Notifications/ToastContainer";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesAction";
import { getAllTravelsAction } from "./Redux/Actions/TravelsAction";
import { getFavoriteTravelsAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";
import EditTravel from "./Screens/Dashboard/Admin/EditTravel";
import ResetPassword from "./Screens/ResetPassword";

function App() {
   const dispatch = useDispatch();
   const { userInfo } = useSelector((state) => state.userLogin);
   const { isError, isSuccess } = useSelector((state) => state.userLikeTravel);
   const { isError: catError } = useSelector((state) => state.getAllCategories);

   useEffect(() => {
      Aos.init({ duration: 1000, delay: 10, offset: 100 });
      dispatch(getAllCategoriesAction());
      dispatch(getAllTravelsAction({}));
      if (userInfo) {
         dispatch(getFavoriteTravelsAction());
      }
      if (isError || catError) {
         toast.error(isError || catError);
         dispatch({ type: "LIKE_TRAVEL_RESET" });
      }
      if (isSuccess) {
         dispatch({ type: "LIKE_TRAVEL_RESET" });
      }
   }, [dispatch, userInfo, isError, catError, isSuccess]);

   return (
      <>
         <ToastContainer />
         <DrawerContext>
            <ScrollToTop>
               <Routes>
                  {/* ************ PUBLIC ROUTER *********** */}
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/travels" element={<TravelsPage />} />
                  <Route path="/travels/:search" element={<TravelsPage />} />
                  <Route path="/travel/:id" element={<SingleTravel />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<NotFound />} />

                  {/* ************ PRIVATE PUBLIC ROUTER *********** */}

                  <Route element={<ProtectedRouter />}>
                     <Route path="/profile" element={<Profile />} />
                     <Route path="/password" element={<Password />} />
                     <Route path="/favorites" element={<FavoritesTravel />} />

                     {/* ************ ADMIN ROUTER *********** */}
                     <Route element={<AdminProtectedRouter />}>
                        <Route path="/travellist" element={<TravelList />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/user" element={<Users />} />
                        <Route path="/addtravel" element={<AddTravel />} />
                        <Route path="/edit/:id" element={<EditTravel />} />
                     </Route>
                  </Route>
               </Routes>
            </ScrollToTop>
         </DrawerContext>
      </>
   );
}

export default App;
