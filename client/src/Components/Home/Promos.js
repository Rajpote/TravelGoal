import React from "react";

function Promos() {
   return (
      <div className="my-20 py-10 md:px-20 px-8 bg-dry">
         <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
            <div className="flex lg:gap-10 gap-6 flex-col">
               <h1 className="xl:text-3xl text-x capitalize font-sans font-medium xl:leading-relaxed">view your farorites places</h1>
               <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
                  Explore a curated list of destinations you’ve saved as favorites. Rediscover the places you love and get inspired for your next adventure.
               </p>
               <div className="flex gap-4 md:text-lg text-sm">
                  <div className="flex-rows gap-4 bg-black md:text-lg text-subMain px-6 py-3 rounded-md">✈️</div>
               </div>
            </div>
            <div className="flex items-center justify-center">
               <img src="/image/logo.png" alt="logo" className="w-auto object-contain" />
            </div>
         </div>
      </div>
   );
}

export default Promos;
