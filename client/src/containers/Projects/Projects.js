import React from "react";
import { makeStyles } from "@material-ui/core";
import Tabs from "./Tabs/Tabs";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    transition: ".3s",
    paddingTop: 100
  }
}));

function Projects() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className="nav-header"
        data-aos="fade-right"
        data-aos-once="true"
        data-aos-delay="50"
        data-aos-easing="ease-in-out"
      >
        PROJECTS
      </div>
      <div
        className="header-bar"
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="200"
        data-aos-easing="ease-in-out"
      ></div>
      <Tabs />
    </div>
  );
}

export default Projects;
