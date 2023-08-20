export type VideoSearchState = {
  searchTerm: string;
  videos: any[];
  isLoading: boolean;
  nextPageToken?: string;
  error?: string;
};

export const videoSearchInitialState: VideoSearchState = {
  searchTerm: "",
  videos: [],
  isLoading: false,
};

export type Actions =
  | {
      type: "searchSuccess";
      searchTerm: string;
      videos: any[];
      nextPageToken: string;
    }
  | { type: "searchFailure"; error: string }
  | { type: "reset" }
  | { type: "loadMore" }
  | { type: "setIsLoading" }
  | {
      type: "loadMoreSuccess";
      videos: any[];
      nextPageToken: string;
    }
  | {
      type: "loadMoreFailure";
      error: string;
    };

export const videoSearchReducer = (
  state: VideoSearchState,
  action: Actions
): VideoSearchState => {
  const { type, ...payload } = action;
  switch (type) {
    case "setIsLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "reset":
      return {
        ...videoSearchInitialState,
      };

    case "searchSuccess":
      return {
        ...state,
        ...payload,
        isLoading: false,
        error: undefined,
      };

    case "searchFailure":
      return {
        ...state,
        ...payload,
        videos: [],
        nextPageToken: undefined,
        isLoading: false,
      };

    case "loadMoreSuccess":
      return {
        ...state,
        ...payload,
        videos: [...state.videos, ...action.videos],
        isLoading: false,
        error: undefined,
      };

    case "loadMoreFailure":
      return {
        ...state,
        ...payload,
        videos: [],
        nextPageToken: undefined,
        isLoading: false,
      };

    default:
      return state;
  }
};
