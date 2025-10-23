import React from "react";
import Banner from "../../components/banner/Banner";
import HeroCards from "../../components/cards/HeroCards";
import VetMarquee from "../../components/vet/VetMarquee";
import WinterCareTips from "../../components/petcaretips/PetcareTips";
import HealthyPetTreats from "../../components/extrasection/HealthyPetTreats";

const Home = () => {
  return (
    <>
      <Banner />
      <HeroCards />
      <VetMarquee />
      <WinterCareTips />
      <HealthyPetTreats></HealthyPetTreats>
    </>
  );
};

export default Home;
