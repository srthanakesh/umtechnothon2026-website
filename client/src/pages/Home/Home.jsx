import React, { Suspense, lazy } from "react";
import FirstPage from "../../components/Home/FirstPage";

// Lazy-load below-fold sections for faster initial page load
const AboutUs = lazy(() => import("../../components/Home/AboutUs"));
const Timeline = lazy(() => import("../../components/Home/Timeline"));
const JudgesMentors = lazy(() => import("../../components/Home/JudgesMentors"));
const Sponsor = lazy(() => import("../../components/Home/Sponsor"));
const Prize = lazy(() => import("../../components/Home/Prize"));
const SocialMedia = lazy(() => import("../../components/Home/SocialMedia/SocialMedia"));
const FAQ = lazy(() => import("../../components/Home/FAQ"));
const MediaPartnersSlider = lazy(() => import("../../components/Home/MediaPartner"));

const Home = () => {
  return (
    <div>
      <FirstPage />
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <div id="about-us">
          <AboutUs />
        </div>
        <div id="timeline">
          <Timeline />
        </div>
        <div id="judges-mentors">
          <JudgesMentors />
        </div>
        <div id="sponsors">
          <Sponsor />
        </div>
        <Prize />
        <MediaPartnersSlider />
        <div id="contact-us">
          <SocialMedia />
        </div>
        <FAQ />
      </Suspense>
    </div>
  );
};

export default Home;