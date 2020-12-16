import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  barHead: {
    backgroundColor: theme.palette.primary.dark,
    height: 30,
    color: "#FFF",
    width: "20%",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8.5pt"
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bar: {
    height: 30,
    backgroundColor: theme.palette.primary.main,
    textAlign: "end"
  },
  root: {
    display: "flex",
    marginBottom: 20
  },
  rootProgress: {
    width: "70%",
    backgroundColor: "#e8e8e8",
    display: "flex",
    color: "#616161"
  },
  percentDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    fontWeight: "bold"
  }
}));

function ProgressBar({ name, percentage }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.barHead}>{name}</div>
      <div className={classes.rootProgress}>
        <div className={classes.bar} style={{ width: percentage }}></div>
      </div>
      <div className={classes.percentDiv}>{percentage}</div>
    </div>
  );
}

export default ProgressBar;
