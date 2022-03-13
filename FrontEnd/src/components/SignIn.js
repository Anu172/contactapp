import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import axiox from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const SignIn = ({ setLogoutUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const signin = (e) => {
    if (validation()) {
      e.preventDefault();
      axiox
        .post("http://localhost:5000/auth/signin", {
          email,
          password,
        })
        .then((response) => {
          // console.log("response", response);
          localStorage.setItem(
            "login",
            JSON.stringify({
              userLogin: true,
              token: response.data.access_token,
            })
          );
          setError("");
          setEmail("");
          setPassword("");
          setLogoutUser(false);
          history.push("/");
        })
        .catch((error) => setError(error.response.data.message));
    }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const validation = () => {
    if (!validateEmail(email)) {
      alert("PLease enter valid email address");
      return false;
    }
    if (!email) {
      alert("Enter Email Id");
      return false;
    }
    if (!password) {
      alert("Enter Password");
      return false;
    }
    return true;
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Sign In</h2>
      <p>
        Don't have an account?
        <Link style={{ textDecoration: "none" }} to="/signup">
          {" "}
          Sign Up
        </Link>
      </p>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={signin}
      >
        <TextField
          id="Email"
          label="Email"
          type="text"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={
            error && (
              <p style={{ color: "red", textAlign: "center", margin: "5px" }}>
                {error}
              </p>
            )
          }
        />
        <br />
        <a href="#" style={{ textDecoration: "none" }}>
          {" "}
          Forgot Password
        </a>
        <br />
        <Button
          style={{ width: "390px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </form>{" "}
    </div>
  );
};

export default SignIn;
