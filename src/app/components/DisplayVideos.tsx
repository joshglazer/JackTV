"use client";

import { useVideoSearchContext } from "@/store/VideoSearchContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Fragment } from "react";
import DefaultVideoSearchTerms from "./DefaultVideoSearchTerms";
import VideoSearchResults from "./VideoSearchResults";

export default function DisplayVideos() {
  const { videos, isLoading } = useVideoSearchContext();

  return (
    <Fragment>
      {videos.length || isLoading ? (
        <VideoSearchResults />
      ) : (
        <DefaultVideoSearchTerms />
      )}
    </Fragment>
  );
}
