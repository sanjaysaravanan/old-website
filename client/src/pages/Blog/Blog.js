import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    transition: ".3s",
    paddingTop: 100,
    paddingBottom: 100
  },
  comingSoon: {
    paddingTop: "20px"
  }
}));

function Blog() {
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
        BLOG
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
        <Typography variant="h4" color="primary">
          COMING SOON
        </Typography>
      </div>
    </div>
  );
}

export default Blog;
