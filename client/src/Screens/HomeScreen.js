import React, { useEffect } from "react";
import Layout from "../Layout/Layout.js";
import Promos from "../Components/Home/Promos.js";
import Banner from "../Components/Home/Banner.js";
import PopularTravel from "../Components/Home/PopularTravel.js";
import TravelRecommendation from "../Components/Home/TravelRecommendation.js";
import TopRated from "../Components/Home/TopRated.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravelsAction, getRandomTravelsAction, getTopRatedTravelsAction } from "../Redux/Actions/TravelsAction.js";
import toast from "react-hot-toast";

function HomeScreen() {
   const dispatch = useDispatch();
   const { isLoading: randomLoading, isError: randomError, travels: randomTravels } = useSelector((state) => state.getRandomTravels);
   // const { isLoading: recommendationLoading, isError: recommendationError, travels: recommendationTravels } = useSelector((state) => state.travelRecommendation);
   const { isLoading: topLoading, isError: topError, travels: topTravels } = useSelector((state) => state.getTopRatedTravels);
   const { isLoading, isError, travels } = useSelector((state) => state.getAllTravels);

   // useEffect
   useEffect(() => {
      dispatch(getRandomTravelsAction());
      // dispatch(getTravelRecommendationsAction());
      dispatch(getAllTravelsAction({}));
      dispatch(getTopRatedTravelsAction());
      if (isError || randomError || topError) {
         toast.error("something went wrong");
      }
   }, [dispatch, isError, randomError, topError]);
   return (
      <Layout>
         <div className="container mx-auto min-h-screen px-2 mb-6">
            <Banner travels={travels} isLoading={isLoading} />
            <TravelRecommendation />
            <PopularTravel travels={randomTravels} isLoading={randomLoading} />
            <Promos />
            <TopRated travels={topTravels} isLoading={topLoading} />
         </div>
      </Layout>
   );
}

export default HomeScreen;
