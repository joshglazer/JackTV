"use client";

import { supabaseClient } from "@/api/supabase";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { useMemo } from "react";
import SearchTermThumbnail from "./SearchTermThumbnail";
export interface SearchTerm {
  name: string;
  pictureUrl: string;
}

export default function DefaultVideoSearchTerms(): JSX.Element {
  const { data, isLoading } = useQuery(
    supabaseClient.from("search_terms").select("id, name, picture_url"),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const defaultVideoSearchTermItems: SearchTerm[] = useMemo(() => {
    return (
      data?.map(({ name, picture_url }) => ({
        name,
        pictureUrl: picture_url,
      })) ?? []
    );
  }, [data]);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <>
        {isLoading ? (
          <CircularProgress sx={{ marginTop: "1em" }} />
        ) : (
          <>
            {defaultVideoSearchTermItems.map((searchTerm) => (
              <Grid key={searchTerm.name} item alignSelf={"center"}>
                <SearchTermThumbnail searchTerm={searchTerm} />
              </Grid>
            ))}
          </>
        )}
      </>
    </Grid>
  );
}
