import React from "react";
import { makeStyles, Dialog, IconButton, Typography, Box, Divider } from "@material-ui/core";
import Stepper from "../Stepper/Stepper";
import { Close } from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    "&:hover": {
      "& $image": {
        opacity: 0
      },
      "& $middle": {
        opacity: 1
      }
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    opacity: 1,
    display: "block",
    width: "100%",
    height: "300px",
    transition: ".3s ease",
    backfaceVisibility: "hidden"
  },
  middle: {
    transition: ".3s ease",
    opacity: 0,
    position: "absolute",
    color: theme.palette.secondary.main
  },
  text: {
    color: theme.palette.secondary.main,
    fontSize: "24px",
    padding: "2px 24px",
    border: "2px solid #E67E22",
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
    cursor: "pointer",
    transition: ".3s"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  sectionMobile: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    minWidth: "fit-content"
  },
  sliderSection: {
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    },
    display: "flex",
    justifyContent: "center"
  },
  customMaxWidth: {
    maxWidth: "none",
    height: "fit-content",
    maxHeight: 640
  }
}));




export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileOpen = () => {
    setOpenMobile(true);
  };
  const handleMobileClose = () => {
    setOpenMobile(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <img
          src={props.mainImage}
          className={classes.image}
          style={{ height: 300, width: 320 }}
          alt={props.name}
        />
        <div className={classes.middle}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {props.name}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: 24 }} color="primary">
            {props.technology.join(" / ")}
          </Typography>
          <div className={classes.sectionDesktop}>
            <div className={classes.text} onClick={handleClickOpen}>
              Learn More
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <div className={classes.text} onClick={handleMobileOpen}>
              Learn More
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionDesktop}>
        <Dialog
          onClose={() => handleClose()}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{ paperScrollPaper: classes.customMaxWidth }}
        >
          <div className={classes.sliderSection}>
            <Stepper tutorialSteps={props.images} autoPlay={false} />
          </div>
          <Box pl={3} pr={3} width={"90%"}>
            <Box mb={1}>
              <Typography variant="h6" >{props.name}</Typography>
            </Box>
            <Divider />
            <Box mt={1}>
              <Typography variant="subtitle1">{props.description}</Typography>
            </Box>
          </Box>
          <Box display="flex" p={2} justifyContent="flex-end" alignItems="center">
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Box>
        </Dialog>
      </div>
      <div className={classes.sectionMobile}>
        <Dialog
          fullScreen
          onClose={handleMobileClose}
          aria-labelledby="customized-dialog-title"
          open={openMobile}
        >
          <div className={classes.sliderSection}>
            <Stepper tutorialSteps={props.images} autoPlay={false} />
          </div>
          <Typography variant="subtitle1">{props.description}</Typography>
        </Dialog>
      </div>
    </div >
  );
}
