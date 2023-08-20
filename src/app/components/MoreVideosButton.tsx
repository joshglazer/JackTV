import { useVideoSearchContext } from "@/store/VideoSearchContext";
import Button from "@mui/material/Button";

export default function MoreVideosButton(): JSX.Element {
  const { loadMore } = useVideoSearchContext();
  return (
    <Button variant="contained" onClick={loadMore}>
      More Videos
    </Button>
  );
}
