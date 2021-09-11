import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";

import { BASE_URL } from "./../config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignIn({setAuth}) {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);

  function submit() {
    setLoading(true);

    if (username && password) {
      axios
        .post(BASE_URL + "/auth/login", { username, password })
        .then((response) => {
          console.log(response.data);
          if (response.data.access_token) {
            setSuccess(true);
            toast.success("Login successfull!");
            localStorage.setItem("token", response.data.access_token )
            setTimeout(()=> window.location.reload(),500)
          }
          setLoading(false);
          setSuccess(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response && err.response.data) {
            let error = err.response.data;
            console.log("Personal info store error: ", error);
            if (error && error.message) {
              toast.error(error.message.replace(/([a-z])([A-Z])/g, "$1 $2"));
            }
          }
          //response.data.error.massage
          setLoading(false);
        });
    } else {
      toast.error("Please enter all field");
      setLoading(false);
    }
  }

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e=> setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=> setPassword(e.target.value)}
          />
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <CircularProgress />
            Sign In
          </Button> */}
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={submit}
              fullWidth
            >
              Login
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
