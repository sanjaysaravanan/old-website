import React from "react";
import { makeStyles, Grid, Link } from "@material-ui/core";
import ProgressBar from "./ProgressBar/ProgressBar";
import "./About.css";
import MyPic from "../../assets/images/sanjay.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: 100,
    paddingBottom: 50,
    alignContent: "center",
  },
  textHeaderDiv: {
    fontSize: "20pt",
    fontWeight: "bold",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: "15pt",
    },
  },
  textDiv: {
    fontSize: "12pt",
    fontWeight: 400,
    margin: "0px 3%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12pt",
      lineHeight: "12pt",
    },
  },
  skillsSection: {
    marginBottom: 20,
    marginRight: "3%",
    marginLeft: "3%",
    marginTop: 20,
  },
  imgDiv: {
    height: 230,
    width: 230,
    borderRadius: "50%",
  },
  companyLink: {
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "none",
    },
  },
  features: {
    marginTop: 20,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className="nav-header"
        data-aos="fade-right"
        data-aos-once="true"
        data-aos-delay="50"
        data-aos-anchor-placement="top-center"
        data-aos-easing="ease-in-out"
      >
        ABOUT
      </div>
      <div
        className="header-bar"
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="200"
        data-aos-easing="ease-in-out"
      ></div>
      <div className="iconsRootDiv">
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <div className={classes.features}>
              <div
                className="iconDivs"
                data-aos="flip-right"
                data-aos-once="true"
                data-aos-delay="200"
                data-aos-easing="ease-in-out"
              >
                <span id="responsive" className="material-icons md-60">
                  important_devices
                </span>
              </div>
              <div className={classes.textHeaderDiv}>Frontend</div>
              <div className={classes.textDiv}>Interactive & Responsive</div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <div className={classes.features}>
              <div
                className="iconDivs"
                data-aos="flip-right"
                data-aos-once="true"
                data-aos-delay="250"
                data-aos-easing="ease-in-out"
              >
                <span i="fast" className="material-icons-outlined md-60">
                  speed
                </span>
              </div>
              <div className={classes.textHeaderDiv}>Backend</div>
              <div className={classes.textDiv}>Fast & Efficient</div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <div className={classes.features}>
              <div
                className="iconDivs"
                data-aos="flip-right"
                data-aos-once="true"
                data-aos-delay="300"
                data-aos-easing="ease-in-out"
              >
                <span className="material-icons-outlined md-60">cloud</span>
              </div>
              <div className={classes.textHeaderDiv}>Cloud</div>
              <div className={classes.textDiv}>Scalable & Containerised</div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <div className={classes.features}>
              <div
                className="iconDivs"
                data-aos="flip-right"
                data-aos-once="true"
                data-aos-delay="350"
                data-aos-easing="ease-in-out"
              >
                <span className="material-icons md-60">all_inclusive</span>
              </div>
              <div className={classes.textHeaderDiv}>CI/CD</div>
              <div className={classes.textDiv}>Integration & Deployment</div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div data-aos="fade-right" data-aos-once="true">
              <img
                src={MyPic}
                className={classes.imgDiv}
                alt="Sanjay Saravanan"
              />
              <div className={classes.textHeaderDiv}>Who's this guy?</div>
              <div className={classes.textDiv}>
                I'm a Software Developer for{" "}
                <Link
                  href="https://www.encora.com"
                  className={classes.companyLink}
                  target="_blank"
                >
                  Encora Inc
                </Link>{" "}
                in India, Bengaluru. I have serious passion for API development,
                UI, DevOps and Cloud services.
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div
              className={classes.skillsSection}
              data-aos="fade-left"
              data-aos-once="true"
            >
              <ProgressBar name="Python" percentage="80%" />
              <ProgressBar name="Javascript" percentage="75%" />
              <ProgressBar name="React" percentage="80%" />
              <ProgressBar name="Node.js" percentage="50%" />
              <ProgressBar name="Docker" percentage="80%" />
              <ProgressBar name="Jenkins" percentage="60%" />
              <ProgressBar name="MongoDB" percentage="70%" />
              <ProgressBar name="Kubernetes" percentage="60%" />
              <ProgressBar name="AWS" percentage="50%" />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default About;
