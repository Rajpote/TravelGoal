import React from "react";
import Layout from "../Layout/Layout";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

function ContactUs() {
   const ContactData = [
      {
         id: 1,
         title: "Email Us",
         info: "Feel free to reach out to us via email.",
         icon: FiMail,
         contact: "info@gmail.com",
      },
      {
         id: 2,
         title: "Call Us",
         info: "You can call us at the provided number.",
         icon: FiPhoneCall,
         contact: "9811897922",
      },
      {
         id: 3,
         title: "Location",
         info: "Located at 456, Kathmandu, Nepal.",
         icon: FiMapPin,
         contact: "456 Kathmandu, Nepal",
      },
   ];

   return (
      <Layout>
         <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <div className="grid gap-6 lg:my-20 mt-10 lg:grid-cols-3 xl:gap-8">
               {ContactData.map((item) => (
                  <div key={item.id} className="border border-border flex flex-col items-center p-10 bg-dry rounded-lg text-center">
                     <span className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                        <item.icon />
                     </span>
                     <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                     <p className="text-sm mb-0 text-text leading-7">
                        {item.title === "Email Us" ? (
                           <a href={`mailto:${item.contact}`} className="text-blue-600 hover:underline">
                              {item.contact}
                           </a>
                        ) : item.title === "Call Us" ? (
                           <a href={`tel:${item.contact}`} className="text-blue-600 hover:underline">
                              {item.contact}
                           </a>
                        ) : (
                           <span>{item.contact}</span>
                        )}
                        <br />
                        {item.info}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </Layout>
   );
}

export default ContactUs;
