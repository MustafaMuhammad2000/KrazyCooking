import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import EditProfilePopUp from "./EditProfilePopUp";
import { useUser } from "../../utils/UserContext";

const ProfilePage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [DOB, setDOB] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [accountCreated, setAccountCreated] = useState(null);
  const [username, setUsername] = useState(null);

  const { user, admin } = useUser();

  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/Profile", {
        headers: {
          authorization: `${user}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setProfilePicture(response.data.profilePicture);
        setAccountCreated(response.data.dateCreated);
        setDOB(response.data.dateOfBirth);
        console.log(response);
        console.log("Username: ", response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleEditClick = () => {
    setIsPopUpVisible(true);
    setEditing(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
    setEditing(false);
  };

  const handleSave = async (newPicture) => {
    if (newPicture) {
      axios
        .get("http://localhost:8000/api/user/Profile", {
          headers: {
            authorization: `${user}`,
          },
        })
        .then((response) => {
          setProfilePicture(response.data.profilePicture);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="profile-page">
        <div className="profile-portion">
          <div className="profile-top">
            <div className="Profile-Background">
              <img id="background-img" src="" alt="" srcset="" />
              <div className="Profile-Picture">
                <img id="profile-img" src={profilePicture} alt="" />
              </div>
              <h1 className="user-name-title">{username}</h1>

              <button className="Edit-Profile-Button" onClick={handleEditClick}>
                Edit Profile
              </button>
              {admin && <p className="admin-text"><b>Admin Account</b></p>}
              <p className="age-title">
                <b>DOB:</b>&nbsp;{DOB}
              </p>
              <p className="country-title">
                <b>Account Created:</b>&nbsp;{accountCreated}
              </p>
            </div>
          </div>
          <div className="profile-middle">
            <div className="profile-info">
            </div>
          </div>
          <div className="profile-bottom"></div>
        </div>
      </div>
      <EditProfilePopUp
        isVisible={isPopUpVisible}
        onClose={handleClosePopUp}
        handleSave={handleSave}
        editing={editing}
        profilePicture={profilePicture}
      />
    </div>
  );
};

export default ProfilePage;
