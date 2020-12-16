import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slider from "../Slider/AutoPlaySlider";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

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
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sliderSection: {
    height: "300px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "250px"
    }
  }
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}))(MuiDialogContent);

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
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => handleClose()}
          >
            {props.name}
          </DialogTitle>
          <DialogContent dividers>
            <div className={classes.sliderSection}>
              <Slider slides={props.images} autoPlay={false} />
            </div>
            <Typography variant="subtitle1">{props.description}</Typography>
          </DialogContent>
        </Dialog>
      </div>
      <div className={classes.sectionMobile}>
        <Dialog
          fullScreen
          onClose={handleMobileClose}
          aria-labelledby="customized-dialog-title"
          open={openMobile}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleMobileClose}>
            {props.name}
          </DialogTitle>
          <DialogContent dividers>
            <div className={classes.sliderSection}>
              <Slider slides={props.images} autoPlay={false} />
            </div>
            <Typography variant="subtitle1">{props.description}</Typography>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
