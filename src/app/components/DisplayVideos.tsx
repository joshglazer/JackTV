"use client";

import { useVideoSearchContext } from "@/store/VideoSearchContext";
import { Fragment } from "react";
import DefaultVideoSearchTerms from "./DefaultVideoSearchTerms";
import VideoSearchResults from "./VideoSearchResults";
import LoadingDialog from "./LoadingDialog";

export default function DisplayVideos() {
  const { videos, isLoading } = useVideoSearchContext();

  return (
    <Fragment>
      {videos.length ? (
        <VideoSearchResults videos={videos} />
      ) : (
        <DefaultVideoSearchTerms />
      )}
      <LoadingDialog isOpen={isLoading} />
    </Fragment>
  );
}
