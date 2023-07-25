"use client";

import { useVideoSearchContext } from "@/store/VideoSearchContext";
import { Fragment } from "react";
import DefaultVideoSearchTerms from "./DefaultVideoSearchTerms";
import VideoSearchResults from "./VideoSearchResults";

export default function DisplayVideos() {
  const { videos } = useVideoSearchContext();

  return (
    <Fragment>
      {!!videos.length ? (
        <VideoSearchResults videos={videos} />
      ) : (
        <DefaultVideoSearchTerms />
      )}
    </Fragment>
  );
}
