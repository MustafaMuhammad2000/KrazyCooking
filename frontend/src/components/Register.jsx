import { useState } from "react";
import { Typography, Stack } from "@mui/material";
import React, { Component } from "react";
import { RegisterAPI } from "../utils/fetchFromApi";

export default function Form() {
  // States for registration
  const [username, setName] = useState("");
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [admin, setAdmin] = useState(false);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const axios = require("axios");

  const [showSuccess, setShowSuccess] = useState(false);

  //handles the name used for registering
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  //handles the password used for registering
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // calls the RegisterAPI function whenever the submit button is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 5) {
      window.alert(`your username needs to be at least 5 characters`);
      return;
    }

    if (password.length < 3) {
      window.alert(`your password needs to be at least 3 characters`);
      return;
    }

    if (username === "" || password === "") {
      setError(true);
      {
        errorMessage();
      }
    } else {
      setSubmitted(true);
      setError(false);
      {
        successMessage();
      }
      try {
        const response = await RegisterAPI(username, password, DOB);
        setShowSuccess(true);
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
    }
  };

  // displays a message when registration was successful
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h4>User {username} registration was successful</h4>
      </div>
    );
  };
  // displays a error when registration was unsuccessful
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  // styles for the GUI
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#FFFFFF",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px",
    backgroundColor: "#B4DAFF",
    borderRadius: "15px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: 400,
    textAlign: "left",
    fontFamily: "Roboto",
    fontStyle: "normal",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#DBDCF9",
    color: "#000000",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: 20,
    border: "1px solid #e3e3e3",
    pl: 2,
    boxShadow: "none",
    mr: { sm: 5 },
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "16px",
    backgroundColor: "#FFFFFF",
  };

  return (
    <div className="form" style={containerStyle}>
      <form style={formStyle}>
        <Typography variant="body1" color="black">
          {/* Labels and inputs for form data */}
          <p>
            <label className="label" style={labelStyle}>
              Username:{" "}
            </label>
          </p>
          <input
            onChange={handleName}
            className="input"
            value={username}
            type="text"
            style={inputStyle}
          />
          <p>
            <label className="label" style={labelStyle}>
              Password:{" "}
            </label>
          </p>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
            style={inputStyle}
          />
          <p>
            <label className="label">Date of Birth</label>
          </p>
          <input
            onChange={(e) => setDOB(e.target.value)}
            className="input"
            value={DOB}
            type="date"
          />{" "}
          <p>
            <button
              onClick={handleSubmit}
              className="btn"
              type="submit"
              style={buttonStyle}
            >
              Submit
            </button>
          </p>
        </Typography>

        <div className="messages">
          <Typography color="black">
            {errorMessage()}
            {showSuccess && successMessage()}
          </Typography>
        </div>
      </form>

      {/* Calling to the methods */}
    </div>
  );
}
