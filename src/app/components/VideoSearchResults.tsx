"use client";

import Grid from "@mui/material/Grid";
import { Fragment, useState } from "react";
import VideoModal from "./VideoModal";
import VideoThumbnail from "./VideoThumbnail";
import MoreVideosButton from "./MoreVideosButton";
import Box from "@mui/material/Box";
interface VideoSearchResultsProps {
  videos: any[];
}

function VideoSearchResults({ videos }: VideoSearchResultsProps): JSX.Element {
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>();

  function handleClick(videoId: string) {
    setSelectedVideoId(videoId);
  }

  function handleClose() {
    setSelectedVideoId(undefined);
  }

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {videos.map((video: any) => {
          return (
            <Grid key={video.id} item alignSelf={"center"}>
              <VideoThumbnail
                key={video.id}
                video={video}
                onClick={handleClick}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: "1em", marginBottom: "1em" }}>
        <MoreVideosButton />
      </Box>
      <VideoModal videoId={selectedVideoId} handleClose={handleClose} />
    </Fragment>
  );
}

export default VideoSearchResults;
