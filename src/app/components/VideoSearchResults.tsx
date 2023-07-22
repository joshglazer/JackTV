import Grid from "@mui/material/Grid";
import { Fragment, useState } from "react";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

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
        sx={{ marginTop: "1em" }}
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
      <VideoModal videoId={selectedVideoId} handleClose={handleClose} />
    </Fragment>
  );
}

export default VideoSearchResults;
