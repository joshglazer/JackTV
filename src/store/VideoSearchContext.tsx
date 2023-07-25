"use client";

import { mockVideos } from "@/data/mockVideos";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type VideoSearchContextType = {
  searchTerm: string;
  updateSearchTerm: (updatedSearchTerm: string) => void;
  videos: any[];
};

const VideoSearchContextDefaultValues: VideoSearchContextType = {
  updateSearchTerm: () => null,
  searchTerm: "",
  videos: [],
};

const VideoSearchContext = createContext<VideoSearchContextType>(
  VideoSearchContextDefaultValues
);

export function useVideoSearchContext() {
  return useContext(VideoSearchContext);
}

type Props = {
  children: ReactNode;
};

export function VideoSearchProvider({ children }: Props): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [videos, setVideos] = useState<any[]>([]);

  const value: VideoSearchContextType = {
    searchTerm,
    updateSearchTerm,
    videos,
  };

  function updateSearchTerm(updatedSearchTerm: string) {
    console.log("HI");
    setSearchTerm(updatedSearchTerm);
  }

  useEffect(() => {
    searchYoutube(searchTerm);
  }, [searchTerm]);

  const searchYoutube = async (searchTerm: string) => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
      setVideos(mockVideos);
      return;
    }

    if (searchTerm) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              q: `${searchTerm} 5 minutes`,
              part: "id",
              type: "video",
              maxResults: 50,
              key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
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
    } else {
      setVideos([]);
    }
  };

  return (
    <VideoSearchContext.Provider value={value}>
      {children}
    </VideoSearchContext.Provider>
  );
}
