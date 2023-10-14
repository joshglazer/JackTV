import { useVideoSearchContext } from "@/store/VideoSearchContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";
import { SearchTerm } from "./DefaultVideoSearchTerms";

interface SearchTermThumbnailProps {
  searchTerm: SearchTerm;
}

export default function SearchTermThumbnail({
  searchTerm,
}: SearchTermThumbnailProps) {
  const { name, pictureUrl } = searchTerm;
  const { search } = useVideoSearchContext();

  function handleClick() {
    search(name);
  }

  return (
    <Card
      sx={{ maxWidth: 200, border: 0 }}
      onClick={handleClick}
      variant="outlined"
    >
      <CardMedia title={name}>
        <Image
          src={pictureUrl}
          alt={`${name} thumbnail`}
          width={200}
          height={200}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "50%", //👈 and here you can select border radius
          }}
        />
      </CardMedia>
      <CardContent sx={{ textAlign: "center", paddingTop: "0.5em" }}>
        <Typography gutterBottom variant="body1" component="div">
          <LinesEllipsis
            text={name}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
