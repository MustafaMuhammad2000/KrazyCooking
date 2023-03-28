import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import EditProfilePopUp from "./EditProfilePopUp";
import { useUser } from "../../utils/UserContext";
import { getProfile } from "../../utils/fetchFromApi";

const ProfilePage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [DOB, setDOB] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [accountCreated, setAccountCreated] = useState(null);
  const [username, setUsername] = useState(null);

  const { user, admin } = useUser();

  /// loads the information about the user whenever this page is loaded
  useEffect(() => {
    const data= getProfile(user);
      data.then((response) => {
        setUsername(response.username);
        setProfilePicture(response.profilePicture);
        setAccountCreated(response.dateCreated);
        setDOB(response.dateOfBirth);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // opens pop-up whenever the edit profile button is clicked
  const handleEditClick = () => {
    setIsPopUpVisible(true);
    setEditing(true);
  };

  /// closes the pop up
  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
    setEditing(false);
  };

  // handles the case when a new picture is saved
  const handleSave = async (newPicture) => {
    if (newPicture) {
      const data = getProfile(user);
        data.then((response) => {
          setProfilePicture(response.profilePicture);
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
