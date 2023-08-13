import { useVideoSearchContext } from "@/store/VideoSearchContext";
import Button from "@mui/material/Button";

export default function MoreVideosButton(): JSX.Element {
  const { searchYoutube } = useVideoSearchContext();
  return (
    <Button variant="contained" onClick={searchYoutube}>
      More Videos
    </Button>
  );
}
