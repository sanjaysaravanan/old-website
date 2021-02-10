import React from "react";
import { makeStyles } from "@material-ui/core";
import Dodge from "./Dodge/Dodge";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    transition: ".3s",
    paddingTop: 100,
    paddingBottom: 100
  },
  comingSoon: {
    paddingTop: "20px"
  },
  gameSection: {
    width: "fit-content",
    height: "fit-content",
    maxHeight: 640
  }
}));

const Games = () => {
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
        GAMES
      </div>
      <div
        className="header-bar"
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="200"
        data-aos-easing="ease-in-out"
      ></div>
      <div
        className={classes.comingSoon}
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-once="true"
      >
        <div style={{ width: "100%" }}>
          <Dodge boardSize={11} playerSize={25} />
        </div>
      </div>
    </div>
  );
};

export default Games;
