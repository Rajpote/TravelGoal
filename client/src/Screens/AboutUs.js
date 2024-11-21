import React from "react";
import Layout from "../Layout/Layout";
import { FaMapMarkerAlt } from "react-icons/fa";

function AboutUs() {
   return (
      <Layout>
         <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-lg mb-6">
               Welcome to TravelGoal, your go-to destination for personalized travel recommendations in Nepal. We are dedicated to helping you discover the best travel spots, from hidden gems to
               popular attractions.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
               Our mission is to provide you with the most reliable and personalized travel suggestions, ensuring your trip to Nepal is unforgettable. We leverage the latest technology and local
               insights to offer recommendations that match your preferences and interests.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
            <div className="relative w-full h-64 mb-6">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1050.4941571252134!2d85.33891202557531!3d27.673194242021147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e8d9058ce3%3A0x5f9f01647e956594!2sKathford%20International%20College!5e0!3m2!1sen!2snp!4v1724130251804!5m2!1sen!2snp"
                  width="600"
                  height="450"
                  title="Map showing location of Kathmaondu
                , Nepal"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full rounded-lg"
               ></iframe>
               <div className="absolute top-2 left-2 bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span className="text-sm text-gray-600">Our Location</span>
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default AboutUs;
