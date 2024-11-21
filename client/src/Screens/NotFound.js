import React from "react";
import Layout from "../Layout/Layout";

function NotFound() {
   return (
      <Layout>
         <div className="flex flex-col items-center justify-center gap-6 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
            <img className="w-full h-96 object-contain" src="/image/404.svg" alt="not found" />
            <h1 className="text-3xl lg:text-4xl font-bold">Page Not Found</h1>
            <p className="font-medium text-gray-300 italic leading-6 text-center">The page you are looking for does not exist. You may have mis-typed the URL or the page might have been removed.</p>
         </div>
      </Layout>
   );
}

export default NotFound;
