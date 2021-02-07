import React, { useState } from "react";
import { makeStyles, useTheme, Button } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    flexGrow: 1
  },
  img: {
    height: 400,
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 200
    },
    overflow: "hidden",
    display: "block"
  }
}));

const Stepper = ({ tutorialSteps }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
      <img className={classes.img} src={tutorialSteps[activeStep]} alt={activeStep} />
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        // style={{ backgroundColor: "#d9d9d9" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
                <KeyboardArrowRight />
              )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
                <KeyboardArrowLeft />
              )}
            Back
          </Button>
        }
      />
    </div>
  );
};

export default Stepper;
