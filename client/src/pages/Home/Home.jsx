import React from "react";
import FirstPage from "../../components/Home/FirstPage";
import Timeline from "../../components/Home/Timeline";
import AboutUs from "../../components/Home/AboutUs";
import Sponsor from "../../components/Home/Sponsor";
import Prize from "../../components/Home/Prize";
import SocialMedia from "../../components/Home/SocialMedia/SocialMedia";
import MediaPartnersSlider from "../../components/Home/MediaPartner";

const Home = () => {
  return (
    <div>
      <FirstPage />
      <div id="about-us">
        <AboutUs />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="sponsors">
        <Sponsor />
      </div>
      <Prize />
      <MediaPartnersSlider />
      <div id="contact-us">
        <SocialMedia />
      </div>
    </div>
  );
};

export default Home;
