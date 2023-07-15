import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useMemo } from "react";

interface VideoThumbnailProps {
  video: any;
  onClick: () => void;
}

export default function VideoThumbnail({
  video,
  onClick,
}: VideoThumbnailProps) {
  const thumbnail = useMemo(() => {
    return (
      video.snippet.thumbnails.standard ??
      video.snippet.thumbnails.medium ??
      video.snippet.thumbnails.default
    );
  }, [video.snippet.thumbnails]);

  return (
    <Box key={video.id} sx={{ textAlign: "center", marginBottom: "2em" }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{ marginBottom: "0.5em", marginTop: "0.25em" }}
      >
        {video.snippet.title}
      </Typography>
      <Image
        src={thumbnail.url}
        alt={`${video.snippet.title} thumbnail`}
        width={thumbnail.width}
        height={thumbnail.height}
        priority
        onClick={onClick}
      />
    </Box>
  );
}
