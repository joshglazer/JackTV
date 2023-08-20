"use client";

import { mockVideos } from "@/data/mockVideos";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type VideoSearchContextType = {
  searchTerm: string;
  updateSearchTerm: (updatedSearchTerm: string) => void;
  searchYoutube: () => Promise<void>;
  videos: any[];
  isLoading: boolean;
};

const VideoSearchContextDefaultValues: VideoSearchContextType = {
  updateSearchTerm: () => null,
  searchYoutube: async () => undefined,
  searchTerm: "",
  videos: [],
  isLoading: false,
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
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchYoutube = useCallback(async () => {
    console.log("SEARCH ME", searchTerm);
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
      setVideos(mockVideos);
      return;
    }

    if (searchTerm) {
      setIsLoading(true);

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
              pageToken: nextPageToken,
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

        let filteredVideos = videoDetailsResponse.data.items.filter(
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

        const currentVideos = nextPageToken ? videos : [];

        if (nextPageToken) {
          filteredVideos = [...currentVideos, ...filteredVideos];
        }

        setVideos(filteredVideos);
        setNextPageToken(response.data.nextPageToken);
        setIsLoading(false);
        console.log(
          "token",
          videoDetailsResponse,
          videoDetailsResponse.data.nextPageToken
        );
      } catch (error) {
        console.error("Error searching videos:", error);
        setIsLoading(false);
      }
    } else {
      setVideos([]);
    }
  }, [nextPageToken, searchTerm, videos]);

  const updateSearchTerm = useCallback(
    (updatedSearchTerm: string) => {
      setVideos([]);
      setNextPageToken(undefined);
      setSearchTerm(updatedSearchTerm);
      searchYoutube();
    },
    [searchYoutube]
  );

  const value: VideoSearchContextType = useMemo(
    () => ({
      searchTerm,
      updateSearchTerm,
      searchYoutube,
      videos,
      isLoading,
    }),
    [searchTerm, updateSearchTerm, searchYoutube, videos, isLoading]
  );

  return (
    <VideoSearchContext.Provider value={value}>
      {children}
    </VideoSearchContext.Provider>
  );
}
