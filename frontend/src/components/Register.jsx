import { useState } from "react";
import { Typography, Stack } from "@mui/material";
import React, { Component } from "react";

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

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const response = await axios.post(
          "http://localhost:8000/api/user/register",
          {
            username: username,
            password: password,
            dateOfBirth: DOB,
          }
        );
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
        alert("Registration failed. Try again.");
      }
    }
  };

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

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#FFFFFF",
  };
  const formStyle = {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '55px',
    backgroundColor: '#B4DAFF', //B4DAFF
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
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
    //borderRadius: '3px',
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

    //boxShadow: '#DBDCF9'
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
            {successMessage()}
          </Typography>
        </div>
      </form>

      {/* Calling to the methods */}
    </div>
  );
}
