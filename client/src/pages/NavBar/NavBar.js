import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Link
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  mainNav: {
    transition: ".3s",
    borderBottom: "4px solid #E67E22"
  },
  listNav: {
    display: "inline-block",
    marginLeft: 40,
    textDecoration: "none",
    color: "#FFF",
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: 2,
      bottom: 0,
      left: 0,
      backgroundColor: "#E67E22",
      visiblity: "hidden",
      transform: "scaleX(0)",
      transition: "all 0.3s ease-in-out 0s"
    },
    "&:hover::before": {
      visiblity: "visible",
      transform: "scaleX(1)"
    },
    "&:hover": {
      textDecoration: "none",
      color: "#FFF"
    },
    textTransform: "uppercase",
    transition: ".5s"
  }
}));

function NavBar() {
  const classes = useStyles();
  return (
    <AppBar
      position="sticky"
      color="secondary"
      className={classes.mainNav}
      elevation={0}
    >
      <Toolbar>
        <a href="#home" className={classes.listNav}>
          <Typography variant="h6">Home</Typography>
        </a>
        <a href="#about" className={classes.listNav}>
          <Typography variant="h6">About</Typography>
        </a>
        <a href="#project" className={classes.listNav}>
          <Typography variant="h6">Projects</Typography>
        </a>
        <a href="#blog" className={classes.listNav}>
          <Typography variant="h6">Blog</Typography>
        </a>
        <a href="#contact" className={classes.listNav}>
          <Typography variant="h6">Contact</Typography>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
