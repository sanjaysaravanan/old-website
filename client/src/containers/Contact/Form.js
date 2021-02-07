import React, { useState } from "react";

import {
  Typography,
  makeStyles,
  Container,
  withStyles,
  TextField,
  Snackbar,
  Button,
  CircularProgress
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { sendMail } from "../../api/Notification/Notification";

const useStyles = makeStyles(theme => ({
  contactRoot: {
    textAlign: "start"
  },
  input: {
    color: "white"
  },
  textField: {
    marginTop: 10
  },
  boxButton: {
    display: "flex",
    justifyContent: "flex-end",
    flexBasis: "100%",
    padding: "15px 0",
    "&:hover": {
      color: theme.palette.primary.light,
      textDecoration: "none"
    }
  },
  navigationLink: {
    color: "#000",
    "&:hover": {
      color: theme.palette.primary.light,
      textDecoration: "none"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  text: {
    color: theme.palette.secondary.main,
    fontSize: "24px",
    padding: "2px 24px",
    border: "2px solid #000",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      border: "2px solid #E67E22"
    },
    cursor: "pointer",
    transition: ".3s",
    borderRadius: "0px",
    height: 40,
    width: 125
  }
}));

const CssTextField = withStyles({
  root: {
    borderRadius: 0,
    backgroundColor: "#E67E22",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 0
      },
      "&:hover fieldset": {
        borderRadius: 0
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        borderRadius: 0
      }
    }
  }
})(TextField);

export default function() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [failureOpen, setFailureOpen] = React.useState(false);
  const [backDropOpen, setBackDropOpen] = React.useState(false);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setBackDropOpen(true);
    sendMail({ name, email, phone, message })
      .then(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setBackDropOpen(false);
        setOpen(true);
      })
      .catch(er => {
        console.log(er);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setBackDropOpen(false);
        setFailureOpen(true);
      });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setFailureOpen(false);
  };

  return (
    <>
      <Container className={classes.contactRoot} maxWidth={"sm"}>
        <form id="messageMail" autoComplete="off" onSubmit={onSubmit}>
          <CssTextField
            label=""
            variant="outlined"
            size="small"
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            fullWidth
            InputProps={{ className: classes.input }}
            className={classes.textField}
            onChange={handleNameChange}
            required
          />
          <CssTextField
            label=""
            variant="outlined"
            size="small"
            required
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            fullWidth
            InputProps={{ className: classes.input }}
            className={classes.textField}
            onChange={handleEmailChange}
          />
          <CssTextField
            label=""
            variant="outlined"
            size="small"
            type="tel"
            value={phone}
            name="phone"
            placeholder="Phone"
            fullWidth
            inputProps={{
              pattern: "[0-9]{10}"
            }}
            InputProps={{ className: classes.input }}
            className={classes.textField}
            onChange={handlePhoneChange}
            required
          />
          <CssTextField
            label=""
            variant="outlined"
            multiline
            rows={4}
            value={message}
            name="message"
            size="small"
            placeholder="Type your message..."
            fullWidth
            InputProps={{ className: classes.input }}
            className={classes.textField}
            onChange={handleMessageChange}
            required
          />
          <div className={classes.boxButton}>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                Thanks for submitting !
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={failureOpen}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Try after sometime.
              </Alert>
            </Snackbar>
            <Button type="submit" className={classes.text}>
              {backDropOpen ? (
                <>
                  <CircularProgress color="inherit" size={25} />
                </>
              ) : (
                <Typography variant="h6">SUBMIT</Typography>
              )}
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
