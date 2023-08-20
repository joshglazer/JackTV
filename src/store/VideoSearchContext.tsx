"use client";

import { searchYoutube } from "@/api/youtube";
import { ReactNode, createContext, useContext, useReducer } from "react";
import {
  videoSearchInitialState,
  videoSearchReducer,
} from "./VideoSearchReducer";

interface VideoSearchContextType {
  videos: any[];
  search: (searchTerm: string) => Promise<void>;
  reset: () => void;
  loadMore: () => Promise<void>;
}

const videoSearchContextDefaultValues = {
  ...videoSearchInitialState,
  search: async (_searchTerm: string) => undefined,
  reset: () => undefined,
  loadMore: async () => undefined,
};

const VideoSearchContext = createContext<VideoSearchContextType>(
  videoSearchContextDefaultValues
);

export function useVideoSearchContext() {
  return useContext(VideoSearchContext);
}

type Props = {
  children: ReactNode;
};

export function VideoSearchProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    videoSearchReducer,
    videoSearchInitialState
  );

  async function search(searchTerm: string): Promise<void> {
    dispatch({ type: "setIsLoading" });
    try {
      const { videos, nextPageToken } = await searchYoutube(searchTerm);
      dispatch({ type: "searchSuccess", searchTerm, videos, nextPageToken });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An Error Occurred";
      dispatch({ type: "searchFailure", error: errorMessage });
    }
  }

  function reset(): void {
    dispatch({ type: "reset" });
  }

  async function loadMore(): Promise<void> {
    dispatch({ type: "setIsLoading" });
    try {
      const { videos, nextPageToken } = await searchYoutube(state.searchTerm);
      dispatch({ type: "loadMoreSuccess", videos, nextPageToken });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An Error Occurred";
      dispatch({ type: "loadMoreFailure", error: errorMessage });
    }
  }
  return (
    <VideoSearchContext.Provider value={{ ...state, search, reset, loadMore }}>
      {children}
    </VideoSearchContext.Provider>
  );
}
