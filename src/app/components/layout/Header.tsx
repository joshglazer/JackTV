"use client";

import { useVideoSearchContext } from "@/store/VideoSearchContext";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { debounce } from "lodash";
import Image from "next/image";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const { search, reset } = useVideoSearchContext();

  const debouncedOnChange = debounce((value: string) => {
    search(value);
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    debouncedOnChange(newValue);
  };

  const resetSearch = () => {
    reset();
  };

  return (
    <Box>
      <AppBar position="static" sx={{ marginBottom: "1em" }}>
        <Toolbar>
          <Box sx={{ marginRight: "1em" }}>
            <Image
              src="/JackTvLogo.png"
              alt="JackTV Logo"
              width={80}
              height={90}
              priority
              onClick={resetSearch}
            />{" "}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="h1"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            JackTV
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleInputChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
