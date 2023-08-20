"use client";

import { useVideoSearchContext } from "@/store/VideoSearchContext";
import Button from "@mui/material/Button";
import { Fragment, MouseEvent } from "react";

interface DefaultVideoSearchTermItem {
  name: string;
}

const defaultVideoSearchTermItems: DefaultVideoSearchTermItem[] = [
  {
    name: "Paw Patrol",
  },
  {
    name: "Fireman Sam",
  },
  {
    name: "Family Fun Squad",
  },
  {
    name: "Power Rangers",
  },
  {
    name: "Paxton Power Rangers",
  },
  {
    name: "Ryan's World",
  },
  {
    name: "Bluey",
  },
  {
    name: "Peppa Pig",
  },
];

export default function DefaultVideoSearchTerms(): JSX.Element {
  const { search } = useVideoSearchContext();

  function handleOnClick(event: MouseEvent<HTMLElement>) {
    search(event.currentTarget.innerText);
  }

  return (
    <Fragment>
      {defaultVideoSearchTermItems.map(({ name }) => (
        <div key={name}>
          <Button onClick={handleOnClick}>{name}</Button>
        </div>
      ))}
    </Fragment>
  );
}
