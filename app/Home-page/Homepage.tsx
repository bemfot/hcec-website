import React from "react";

import PrayerRequest from "../Contact-Us/Prayer-RequestForm/page";

import Focus from "../Focus-Section/page";
import Heropage from "./HeroPage/page";
import HomeEvents from "@/app/components/HomeEvents";
import YoutubeLinkPage from "@/app/youtube/page";
import WelcomePage from "../welcome/page";

export default function Homepage() {
  return (
    <div>
      <Heropage />
 <WelcomePage />
      <Focus />

      <HomeEvents />
      <YoutubeLinkPage />
      <div className="mt-[8rem] lg:mt-[5rem]">
        <PrayerRequest />
      </div>
    </div>
  );
}
