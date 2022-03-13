import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import axiox from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const ContactForm = ({ emailCheck }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  const SaveContact = (e) => {
    if (validation()) {
      axiox
        .post("http://localhost:5000/savecontact", {
          emailCheck,
          name,
          phone,
          email,
        })
        .then((response) => {
          setName("");
          setEmail("");
          setPhone("");
        })
        .catch((error) => setError(error.response?.data?.message));
      getContact();
    }
  };

  const getContact = () => {
    axiox
      .get("http://localhost:5000/showcontact")
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch((error) => setError(error.response.data.message));
  };

  const validation = () => {
    if (!name) {
      alert("Enter Name");
      return false;
    }
    if (!phone) {
      alert("Enter Phone number");
      return false;
    }
    if (!email) {
      alert("Enter Email Id");
      return false;
    }

    return true;
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={SaveContact}
        >
          <TextField
            id="Name"
            label="Name"
            type="text"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            id="Phone"
            label="Phone Number"
            type="number"
            variant="outlined"
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <TextField
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <Button
            style={{ width: "390px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <center>
          <h2>Contact List</h2>

          <TableContainer
            style={{
              width: "70%",
              margin: "20px",
              borderRadius: "20px",
            }}
            className={"hello"}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {["Name", "Phone", "Email"].map((content) => (
                    <TableCell
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      {content}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{contact.name}</TableCell>
                    <TableCell align="center">{contact.phone}</TableCell>
                    <TableCell align="center">{contact.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </center>
      </div>
    </>
  );
};

export default ContactForm;
