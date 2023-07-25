import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useMemo } from "react";
import LinesEllipsis from "react-lines-ellipsis";
interface VideoThumbnailProps {
  video: any;
  onClick: (videoId: string) => void;
}

export default function VideoThumbnail({
  video,
  onClick,
}: VideoThumbnailProps) {
  const thumbnail = useMemo(() => {
    return video.snippet.thumbnails.medium ?? video.snippet.thumbnails.default;
  }, [video.snippet.thumbnails]);

  function handleClick() {
    onClick(video.id);
  }

  return (
    <Card sx={{ maxWidth: thumbnail.width }} onClick={handleClick}>
      <CardMedia title={video.snippet.title}>
        <Image
          src={thumbnail.url}
          alt={`${video.snippet.title} thumbnail`}
          width={thumbnail.width}
          height={thumbnail.height}
          objectFit="contain"
          priority
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          <LinesEllipsis
            text={video.snippet.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
