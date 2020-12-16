import React from "react";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Canvas from "./Canvas/Canvas";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px"
  },
  home: {
    color: "#FFF",
    position: "absolute"
  },
  text: {
    fontSize: "3rem",
    lineHeight: "3rem",
    fontWeight: 350,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      lineHeight: "1.5rem"
    }
  },
  highlight: {
    color: "#E67E22",
    fontWeight: "500"
  },
  workView: {
    border: "2px solid #FFF",
    boxSizing: "inherit",
    fontSize: "18pt",
    display: "inline-block",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    transition: ".5s",
    cursor: "pointer",
    textDecoration: "none",
    color: "#FFF",
    "&:hover": {
      border: "2px solid #E67E22",
      backgroundColor: "#E67E22",
      transition: ".5s",
      "& $arrowIcon": {
        transform: "rotate(90deg)",
        transition: ".5s"
      },
      textDecoration: "none",
      color: "#FFF"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "13pt"
    }
  },
  arrowIcon: {
    transition: ".5s",
    verticalAlign: "middle"
  }
}));

function Home({ scrollMethod, homeRef }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.home}>
        <div className={classes.text}>
          Hello, I'm <span className={classes.highlight}>Sanjay Saravanan</span>
          .<br />
          I'm a full-stack developer.
        </div>
        <div className={classes.workView} onClick={() => scrollMethod(homeRef)}>
          View my work <ArrowForwardIcon className={classes.arrowIcon} />
        </div>
      </div>
      <Canvas />
    </div>
  );
}

export default Home;
