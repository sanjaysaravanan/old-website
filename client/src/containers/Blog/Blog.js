import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import BlogComponent from "./BlogComponent";
import currentProjects from "./config";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    transition: ".3s",
    paddingTop: 100,
    paddingBottom: 100,
  },
  comingSoon: {
    paddingTop: "20px",
  },
  hoverDiv: {
    transition: ".3s",
    background: "transparent",
  },
  disableDiv: {
    opacity: 0.4,
    transition: ".3s",
    background: "transparent",
  },
}));

function Blog() {
  const classes = useStyles();
  const [currentBlog, setCurrentBlog] = useState(null);
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
        <Grid container spacing={3} justify="center">
          {currentProjects.map((item, i) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              key={item.name}
              style={{ maxWidth: "324px" }}
            >
              <div
                onMouseOver={() => setCurrentBlog(i)}
                onMouseLeave={() => setCurrentBlog(null)}
                className={
                  currentBlog === i || currentBlog === null
                    ? classes.hoverDiv
                    : classes.disableDiv
                }
              >
                <BlogComponent data={item} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Blog;
