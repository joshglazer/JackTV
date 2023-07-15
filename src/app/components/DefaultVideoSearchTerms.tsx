import { useVideoSearchContext } from "@/store/VideoSearchContext";
import Button from "@mui/material/Button";
import { Fragment, MouseEvent } from "react";

interface defaultVideoSearchTermItem {
  name: string;
}

const defaultVideoSearchTermItems: defaultVideoSearchTermItem[] = [
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
];

export default function DefaultVideoSearchTerms(): JSX.Element {
  const { updateSearchTerm } = useVideoSearchContext();

  function handleOnClick(event: MouseEvent<HTMLElement>) {
    updateSearchTerm(event.currentTarget.innerText);
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
