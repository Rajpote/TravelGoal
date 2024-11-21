import React, { useState } from "react";
import Layout from "../Layout/Layout"; // Ensure Layout is exported correctly
import { Input } from "../Components/usedInput"; // Ensure Input is exported correctly
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
   const [email, setEmail] = useState(""); // State to store email input
   const [isLoading, setIsLoading] = useState(false); // Loading state to show spinner
   const navigate = useNavigate();

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form behavior
      setIsLoading(true); // Show loading spinner
      try {
         const response = await axios.post("http://localhost:5000/api/users/forgot", { email });
         if (response.status === 200) {
            toast.success(response.data.message); // Show success message if OTP sent
            navigate("/reset-password"); // Redirect to Reset Password page
         } else {
            toast.error(response.data.message || "Something went wrong"); // Handle errors if any
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong"); // Show error message on failure
      } finally {
         setIsLoading(false); // Hide loading spinner after request is complete
      }
   };

   return (
      <Layout>
         <div className="container mx-auto px-2 my-24 flex-colo">
            <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 flex-colo p-8 bg-dry rounded-lg border border-border gap-8">
               <h2 className="text-xl font-semibold">Forgot Password</h2>
               <div className="w-full">
                  <Input
                     label="Email Address"
                     type="email"
                     placeholder="example@gmail.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} // Update email state on change
                     bg={true} // Ensure the background styling is correct
                  />
               </div>
               <button
                  type="submit"
                  disabled={isLoading} // Disable button when loading
                  className="bg-subMain transitions hover:bg-main text-white p-4 rounded-lg w-full"
               >
                  {isLoading ? <div className="loader"></div> : "Send OTP"} {/* Show loader while loading */}
               </button>
            </form>
         </div>
         <ToastContainer />
      </Layout>
   );
}

export default ForgotPassword;
