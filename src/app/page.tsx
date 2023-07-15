"use client";

import { VideoSearchProvider } from "@/store/VideoSearchContext";
import "react-modal-video/scss/modal-video.scss";
import DisplayVideos from "./components/DisplayVideos";
import SearchAppBar from "./components/SearchAppBar";

const HomePage = () => {
  return (
    <VideoSearchProvider>
      <SearchAppBar />
      <DisplayVideos />
    </VideoSearchProvider>
  );
};

export default HomePage;
