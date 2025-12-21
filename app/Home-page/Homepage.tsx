"use client";

import { useEffect, useState } from "react";

import PrayerRequest from "../Contact-Us/Prayer-RequestForm/page";

import HomeEvents from "@/app/components/HomeEvents";
import YoutubeLinkPage from "@/app/youtube/page";
import WelcomePage from "@/app/welcome/page";
import api from "@/utils/api";
import Focus from "../Focus-Section/page";
import Heropage from "./HeroPage/page";

let hasVisited = false;
export default function Homepage() {
  const [runStartRequest, setRunStartRequest] = useState(!hasVisited);

  useEffect(() => {
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setRunStartRequest(false);
        hasVisited = true;
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setRunStartRequest(false);
    }
  }, []);

  useEffect(() => {
    if (!runStartRequest) return;

    let mounted = true;
    (async () => {
      try {
        await api.get("/health");
      } catch (err) {}
    })();

    return () => {
      mounted = false;
    };
  }, [runStartRequest]);

  return (
    <div>
      <Heropage />
 
      <Focus />
    <div className="mt-[8rem] lg:mt-[5rem]">
      <WelcomePage /></div>

      <HomeEvents />
      <YoutubeLinkPage />
      <div className="mt-[8rem] lg:mt-[5rem]">
        <PrayerRequest />
      </div>
    </div>
  );
}
