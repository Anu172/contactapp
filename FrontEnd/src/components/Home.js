import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import Box from "@material-ui/core/Box";

const Home = () => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  console.log(isLoginTrue);

  const userNotLogin = () => (
    <>
      <h1 style={{ fontFamily: "cursive", fontSize: "90px" }}>Contacts App</h1>
      <Box display="flex" flexDirection="row" justifyContent="space-evenly">
        <Box
          p={2}
          style={{
            width: "30%",
            border: "2px solid #DA3287 ",
            borderRadius: "20px",
          }}
        >
          If you have an account,{" "}
          <Link style={{ textDecoration: "none" }} to="/signin">
            Sign In
          </Link>
        </Box>

        <Box
          p={2}
          style={{
            width: "30%",
            border: "2px solid #DA3287",
            borderRadius: "20px",
          }}
        >
          Don't have an account,then{" "}
          <Link style={{ textDecoration: "none" }} to="/signUp">
            Sign Up
          </Link>
        </Box>
      </Box>
    </>
  );
  return (
    <div style={{ marginTop: "20px" }}>
      {isLoginTrue && isLoginTrue.userLogin ? (
        <>
          <h2>Add Contacts</h2>
          <ContactForm emailCheck={isLoginTrue.email} />
        </>
      ) : (
        <>{userNotLogin()}</>
      )}
    </div>
  );
};

export default Home;
