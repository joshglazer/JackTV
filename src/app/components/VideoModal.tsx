import Dialog from "@mui/material/Dialog";
import ModalVideo from "react-modal-video";

interface VideoModalProps {
  videoId?: string;
  handleClose: () => void;
}

export default function VideoModal({
  videoId = "",
  handleClose,
}: VideoModalProps): JSX.Element {
  return (
    <Dialog fullScreen open={!!videoId} onClose={handleClose}>
      <ModalVideo
        channel="youtube"
        youtube={{
          mute: 0,
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          showInfo: 0,
        }}
        isOpen={!!videoId}
        videoId={videoId}
        onClose={handleClose}
      />
    </Dialog>
  );
}
