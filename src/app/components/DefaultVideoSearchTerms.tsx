"use client";

import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import SearchTermThumbnail from "./SearchTermThumbnail";

export interface SearchTerm {
  name: string;
  pictureUrl: string;
}

const defaultVideoSearchTermItems: SearchTerm[] = [
  {
    name: "Paw Patrol",
    pictureUrl:
      "https://yt3.googleusercontent.com/d83FgJTp4AB_v1KAuNC_WXIrS2lAYslBLRKQSRB3zFW3QSzd1Pn2NMMlKW0I-0f2qL1HNsk0=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Transformers Rescue Bots",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/APkrFKZb2mnV8c2zgkqgiMI5DIAnjdTDddMwjBzXxrPw=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Power Rangers",
    pictureUrl:
      "https://yt3.googleusercontent.com/mspho71WrC770mfs4jl16tShx63y1AA6VEBKjkRlf8NCnPssdvTQhYPoQjDDmjCvqUPhWGEkH2A=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Fire Buds",
    pictureUrl:
      "https://yt3.googleusercontent.com/6xKs_EH-idT4USjEJwtyfIJSn4sFNhTYI3PnWNXiPZ_EXh5DrqyHbKTt8Ep8t9nWTzqkeBgXTA",
  },
  {
    name: "Spidey and his Amazing Friends",
    pictureUrl:
      "https://i.ytimg.com/vi/k3zMUkBKjKw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNJWeBVv_Z4rhnb0tXn3_r2JByAA",
  },
  {
    name: "Blaze and the Monster Machines",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/APkrFKYBg_xITgr9MTx-gT2ovt2UC5e6ZgqksU27QFixiA=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Super Wings",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/APkrFKZzDUMj5ApDF9lbzkgRsL08S9XRuBH2_3O_FwyzbQ=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Batwheels",
    pictureUrl:
      "https://i.ytimg.com/vi/Iddo1dnCgeg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCR_ISgbdr0wDO0m0639iEr_L5OkQ",
  },
  {
    name: "Young Jedi Adventures",
    pictureUrl:
      "https://i.ytimg.com/vi/IqvDvQ1tuJ4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0iq8ljReXwjGMMpJ7DRd1DT9dKA",
  },
  {
    name: "Fireman Sam",
    pictureUrl:
      "https://yt3.googleusercontent.com/jMN6L2OH2xG4ppZ1e290Ay5fCjV0TnbFznVLBI8SnZbdQqlyTVVbGfDOuC6swN1E5mILCuGx=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Family Fun Squad",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/AOPolaROjdK4Uldd0uYzXV77ovvSd_Co9fHcNyfTZ1LDUQ=s176-c-k-c0x00ffffff-no-rj",
  },

  {
    name: "Ryan's World",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/AOPolaR7Jux3iIxrypbPltElsjGlk8kSj7BC6x2yvSXSEQ=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Bluey",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/AOPolaTOW1xJWre86fCwse8DQMYRGGY71y4HQHstXzXNBA=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Peppa Pig",
    pictureUrl:
      "https://yt3.googleusercontent.com/ytc/AOPolaTx9dH8gpVUVwMVVmgHa_YU1ERo6RxOapk9wnMUqw=s176-c-k-c0x00ffffff-no-rj-mo",
  },
];

export default function DefaultVideoSearchTerms(): JSX.Element {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Fragment>
        {defaultVideoSearchTermItems.map((searchTerm) => (
          <Grid key={searchTerm.name} item alignSelf={"center"}>
            <SearchTermThumbnail searchTerm={searchTerm} />
          </Grid>
        ))}
      </Fragment>
    </Grid>
  );
}
