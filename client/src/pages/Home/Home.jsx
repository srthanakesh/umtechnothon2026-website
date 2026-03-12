import React from "react";
import FirstPage from "../../components/Home/FirstPage";
import AboutUs from "../../components/Home/AboutUs";
import Timeline from "../../components/Home/Timeline";
import JudgesMentors from "../../components/Home/JudgesMentors";
import Sponsor from "../../components/Home/Sponsor";
import Prize from "../../components/Home/Prize";
import SocialMedia from "../../components/Home/SocialMedia/SocialMedia";
import FAQ from "../../components/Home/FAQ";
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
      {/* <div id="judges-mentors">
        <JudgesMentors />
      </div> */}
      <div id="sponsors">
        <Sponsor />
      </div>
      <Prize />
      {/* <MediaPartnersSlider /> */}
      <div id="contact-us">
        <SocialMedia />
      </div>
      <FAQ />
    </div>
  );
};

export default Home;