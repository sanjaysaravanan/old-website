import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Form from "./Form";
const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    transition: ".3s",
    paddingTop: 100
  },
  typoDiv: {
    padding: "24px 0px"
  }
}));

function Contact() {
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
        CONTACT
      </div>
      <div
        className="header-bar"
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="200"
        data-aos-easing="ease-in-out"
      ></div>
      <div
        className={classes.typoDiv}
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="300"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <Typography variant="h6">
          Have a question or want to work together?
        </Typography>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        <Form />
      </div>
    </div>
  );
}

export default Contact;
