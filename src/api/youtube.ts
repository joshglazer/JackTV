import axios from "axios";

interface SearchYoutubeResults {
  videos: any[];
  nextPageToken: string;
}

async function searchYoutube(
  searchTerm: string,
  nextPageToken?: string
): Promise<SearchYoutubeResults> {
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

  let filteredVideos = videoDetailsResponse.data.items.filter((video: any) => {
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
  });

  return {
    videos: filteredVideos,
    nextPageToken: response.data.nextPageToken,
  };
}

export { searchYoutube };
