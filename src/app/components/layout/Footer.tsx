"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography variant="body1">
          A{" "}
          <Link href="https://portfolio.joshglazer.com" target="_blank">
            Josh Glazer
          </Link>{" "}
          Project
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: { xs: "0.5em", sm: "0" } }}
        >
          <Link href="https://github.com/joshglazer/jacktv" target="_blank">
            <GitHubIcon sx={{ fontSize: "smaller" }} /> Source Code on Github
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
