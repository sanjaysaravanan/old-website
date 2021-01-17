import React from "react";
import { makeStyles, Link } from "@material-ui/core";
import { Facebook, Twitter, Instagram, LinkedIn } from "@material-ui/icons";
import Copyright from "./Copyright";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    transition: ".3s",
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: theme.palette.secondary.main
  },
  comingSoon: {
    paddingTop: "20px"
  },
  iconDiv: {
    height: 55,
    width: 55,
    margin: "0px 15px",
    backgroundColor: "#262F38",
    color: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(0.7)",
      backgroundColor: theme.palette.primary.main
    }
  },
  iconsDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function Blog() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.iconsDiv}>
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/sanjaysaravanan21"
          target="_blank"
          className={classes.linkDiv}
        >
          <div className={classes.iconDiv}>
            <LinkedIn />
          </div>
        </Link>
        <Link
          color="inherit"
          href="https://www.facebook.com/sanjaysaravanan21"
          target="_blank"
          className={classes.linkDiv}
        >
          <div className={classes.iconDiv}>
            <Facebook />
          </div>
        </Link>
        <Link
          color="inherit"
          href="https://www.instagram.com/sanjaysaravanan_21"
          target="_blank"
          className={classes.linkDiv}
        >
          <div className={classes.iconDiv}>
            <Instagram />
          </div>
        </Link>
        <Link
          color="inherit"
          href="https://twitter.com/sanjaysaravan21"
          target="_blank"
          className={classes.linkDiv}
        >
          <div className={classes.iconDiv}>
            <Twitter />
          </div>
        </Link>
      </div>
      <Copyright />
    </div>
  );
}

export default Blog;
