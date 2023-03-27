import React, { useState } from "react";
import "./EditProfilePopUp.css";
import { useUser } from "../../utils/UserContext";

const EditProfilePopUp = ({
  isVisible,
  onClose,
  handleSave,
  editing,
  profilePicture,
}) => {
  const [CurrentPW, setCurrentPW] = useState("");
  const [newPassword, setNewPW] = useState("");
  const [ConfirmPassword, setConfirmPW] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [error, setError] = useState(false);
  const { user, setUser } = useUser();

  const axios = require("axios");

  if (!isVisible) {
    return null;
  }

  const handleSaveClick = async (e) => {
    // update profile information here with new values

    e.preventDefault();

    let data = new FormData();
    data.append("image", newProfilePicture);
    console.log(data);
    console.log("what:", newProfilePicture);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/uploadProfilePic",
        data,
        {
          headers: {
            authorization: `${user}`,
          },
        }
      );
      console.log("what:", res);
      handleSave(newProfilePicture);
    } catch {
      console.error("error:", error);
      alert("Profile picture upload failed. Please try again.");
    }

    // onClose(); // hide the pop-up
  };

  const handleChangePWClick = async (e) => {
    e.preventDefault();

    if (
      newPassword === "" ||
      CurrentPW === "" ||
      ConfirmPassword === "" ||
      newPassword != ConfirmPassword
    ) {
      setError(true);
    } else {
      // setSubmitted(true);
      setError(false);
      try {
        const response = await axios.patch(
          "http://localhost:8000/api/user/updatePassword",
          {
            currentPassword: `${CurrentPW}`,
            newPassword: `${newPassword}`,
          },
          {
            headers: {
              authorization: `${user}`,
            },
          }
        );
        console.log(response.data);
        alert("Password changed successfully!");
        setCurrentPW("");
        setNewPW("");
        setConfirmPW("");
      } catch (error) {
        console.error(error);
        alert("Password change failed. Please try again.");
      }
    }
  };

  const handleCloseClick = () => {
    onClose(); // hide the pop-up
  };

  return (
    <div className="popup">
      <div className="inside-pop">
        <div className={`Edit-Profile-Pop-Up ${isVisible ? "visible" : ""}`}>
          <h2>Edit Profile</h2>
          <form>
            <label htmlFor="profile-picture-input">Profile Picture:</label>
            <input
              id="profile-picture-input"
              type="file"
              accept="image/jpeg, image/png, image/jpg, image/bmp"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewProfilePicture(file);
                console.log("Image:", file);
                console.log("NEW PFPImage:", newProfilePicture);
              }}
            />

            <br />
            <button onClick={handleSaveClick}>Save</button>
            <br />
            <br />
            <br />
            <label htmlFor="country-input">
              <b>Change Password:</b>
            </label>
            <br />
            <label htmlFor="country-input">Current Password:</label>
            <input
              id="currentpw-input"
              type="password"
              value={CurrentPW}
              onChange={(e) => setCurrentPW(e.target.value)}
            />
            <br />
            <label htmlFor="country-input">New Password:</label>
            <input
              id="newpw-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPW(e.target.value)}
            />
            <br />
            <label htmlFor="country-input">Confirm Password:</label>
            <input
              id="confirmpw-input"
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPW(e.target.value)}
            />
            <br />
            <button className="change-btn" onClick={handleChangePWClick}>
              <b>Change</b>
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </form>
        </div>
        <button className="close-btn" onClick={handleCloseClick}>
          <b>X</b>
        </button>
      </div>
    </div>
  );
};

export default EditProfilePopUp;
