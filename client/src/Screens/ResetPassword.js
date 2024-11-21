import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/usedInput";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
   const [formData, setFormData] = useState({
      email: "",
      otp: "",
      newPassword: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const { data } = await axios.post(" http://localhost:5000/api/users/reset", formData);
         if (data.success) {
            toast.success(data.message);
            navigate("/login"); // Redirect
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <Layout>
         <div className="container mx-auto px-2 my-24 flex-colo">
            <form onSubmit={handleSubmit} className="w-full sm:w-3/5 lg:w-2/5 flex-colo p-8 bg-dry rounded-lg border border-border gap-8">
               <h2 className="text-xl font-semibold">Reset Password</h2>
               <div className="w-full">
                  <Input label="Email" type="email" name="email" placeholder="Enter the email" value={formData.email} onChange={handleChange} bg={true} />
               </div>
               <div className="w-full">
                  <Input label="OTP" type="text" name="otp" placeholder="Enter the OTP" value={formData.otp} onChange={handleChange} bg={true} />
               </div>
               <div className="w-full">
                  <Input label="New Password" type="password" name="newPassword" placeholder="******" value={formData.newPassword} onChange={handleChange} bg={true} />
               </div>
               <button type="submit" disabled={isLoading} className="bg-subMain transitions hover:bg-main text-white p-4 rounded-lg w-full">
                  {isLoading ? <div className="loader"></div> : "Reset Password"}
               </button>
            </form>
         </div>
         <ToastContainer />
      </Layout>
   );
}

export default ResetPassword;
