"use client";

import axios from "axios";
import { debounce } from "lodash";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import SearchAppBar from "./components/SearchAppBar";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [modalVideoId, setModalVideoId] = useState<string>();

  const debouncedOnChange = debounce((value: string) => {
    // Handle the debounced change event here
    searchYoutube(value);
  }, 500); // Adjust the debounce delay (in milliseconds) according to your needs

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  const searchYoutube = async (searchTerm: string) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: `${searchTerm} 5 minutes`,
            part: "id",
            type: "video",
            maxResults: 50,
            key: "AIzaSyC_-_5Kdz9RzphIs_--S_WGylcQG_MJgkY",
            videoEmbeddable: "true",
            relevanceLanguage: "en",
            duration: "medium",
          },
        }
      );

      const videoIDs = response.data.items.map(
        ({ id }: { id: { videoId: string } }) => id.videoId
      );

      const videoDetailsResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            q: searchTerm,
            part: "id,snippet,contentDetails",
            id: videoIDs.join(","),
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          },
        }
      );

      const filteredVideos = videoDetailsResponse.data.items.filter(
        (video: any) => {
          const duration = video.contentDetails.duration;
          const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

          if (duration) {
            const match = duration.match(durationRegex);
            if (match) {
              const [, hours, minutes, seconds] = match;
              const totalSeconds =
                (parseInt(hours) || 0) * 3600 +
                (parseInt(minutes) || 0) * 60 +
                (parseInt(seconds) || 0);
              return totalSeconds < 360; // Filter videos less than 6 minutes (360 seconds)
            }
          }
          return false;
        }
      );

      setVideos(filteredVideos);
    } catch (error) {
      console.error("Error searching videos:", error);
    }
  };

  return (
    <div>
      <SearchAppBar onChange={handleInputChange} />

      {videos.map((video: any) => {
        const thumbnail =
          video.snippet.thumbnails.standard ??
          video.snippet.thumbnails.medium ??
          video.snippet.thumbnails.default;

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
              src={thumbnail.standard.url}
              alt={`${video.snippet.title} thumbnail`}
              width={thumbnail.standard.width}
              height={thumbnail.standard.height}
              priority
              onClick={() => setModalVideoId(video.id)}
            />
          </Box>
        );
      })}

      <Dialog
        fullScreen
        open={!!modalVideoId}
        onClose={() => setModalVideoId(undefined)}
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
    </div>
  );
};

export default HomePage;
