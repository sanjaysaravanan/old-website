import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core";
import { Tabs, Tab, Box } from "@material-ui/core";
import ListProjects from "../ProjectsList";

const AntTabs = withStyles({
  indicator: {
    backgroundColor: "#E67E22",
    paddingBottom: "4px"
  }
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    minWidth: 72,
    fontWeight: "bold",
    fontSize: "24px",
    marginRight: theme.spacing(4),
    fontFamily: ['"Segoe UI"'].join(","),
    "&$selected": {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 15,
      fontSize: "12px",
      marginRight: theme.spacing(0)
    },
    transition: ".3s"
  },
  selected: {
    borderBottom: ""
  }
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function LoginRegister() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.paper}>
      <AntTabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <AntTab value="one" label="All" {...a11yProps("one")} />
        <AntTab value="two" label="ReactJs" {...a11yProps("two")} />
        <AntTab value="three" label="Javascript" {...a11yProps("three")} />
        <AntTab value="four" label="python" {...a11yProps("four")} />
      </AntTabs>
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
        <TabPanel value={value} index="one">
          <ListProjects name="All" />
        </TabPanel>
        <TabPanel value={value} index="two">
          <ListProjects name="React-JS" />
        </TabPanel>
        <TabPanel value={value} index="three">
          <ListProjects name="Javascript" />
        </TabPanel>
        <TabPanel value={value} index="four">
          <ListProjects name="Python" />
        </TabPanel>
      </div>
    </div>
  );
}
