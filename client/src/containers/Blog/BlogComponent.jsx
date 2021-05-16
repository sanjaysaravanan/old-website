import React, { useState } from "react";
import { Typography, Box, makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  blogDiv: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

const BlogComponent = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const { mainImage, title, date, description, url } = data;

  return (
    <a
      href={url}
      className={classes.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={classes.blogDiv}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={mainImage}
          alt="Blog"
          style={{
            width: "300px",
            height: "200px",
          }}
        />
        <Typography
          variant="h6"
          style={{
            marginTop: "16px",
            textAlign: "start",
            fontWeight: 500,
            color: hover ? theme.palette.primary.main : "#000",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginTop: "8px", textAlign: "start" }}
        >
          {date}
        </Typography>
        <Box
          height="3px"
          mt={2}
          mb={2}
          mr={"80%"}
          bgcolor={"primary.main"}
        ></Box>
        <Box height="60px" textAlign="start" >
          <Typography variant="subtitle2" >{description}</Typography>
        </Box>
      </div>
    </a>
  );
};

export default BlogComponent;
