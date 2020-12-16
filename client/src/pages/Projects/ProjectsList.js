import React from "react";
import Projects from "./Configs/config";
import { Grid } from "@material-ui/core";
import PictureDialogue from "./PictureDialogue/PictureDialogue";

function ListProjects({ name }) {
  const currentProjects =
    name !== "All"
      ? Projects.filter(item => item.technology.includes(name))
      : Projects;
  return (
    <Grid container spacing={2} justify="space-around">
      {currentProjects.map(item => (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          key={item.name}
          style={{ maxWidth: "100%" }}
        >
          <PictureDialogue {...item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListProjects;
