import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    color: "#FFF"
  }
}));

export default function Copyright() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2" align="center">
        Created By Sanjay Saravanan.
      </Typography>
    </div>
  );
}
