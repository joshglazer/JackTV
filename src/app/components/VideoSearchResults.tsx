import { Fragment, useState } from "react";
import VideoThumbnail from "./VideoThumbnail";
import ModalVideo from "react-modal-video";
import Dialog from "@mui/material/Dialog";

interface VideoSearchResultsProps {
  videos: any[];
}

function VideoSearchResults({ videos }: VideoSearchResultsProps): JSX.Element {
  const [modalVideoId, setModalVideoId] = useState<string | undefined>();

  return (
    <Fragment>
      {videos.map((video: any) => {
        return (
          <VideoThumbnail
            key={video.id}
            video={video}
            onClick={() => setModalVideoId(video.id)}
          />
        );
      })}
      <Dialog
        fullScreen
        open={!!modalVideoId}
        // onClose={() => setModalVideoId(undefined)}
      >
        <div>
          <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0, rel: 0 }}
            isOpen={!!modalVideoId}
            videoId={modalVideoId || ""}
            onClose={() => setModalVideoId(undefined)}
          />
        </div>
      </Dialog>
    </Fragment>
  );
}

export default VideoSearchResults;
