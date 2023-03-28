import React, { useState } from "react";
import "./EditProfilePopUp.css";
import { useUser } from "../../utils/UserContext";
import { changePassword, postProfilePic } from "../../utils/fetchFromApi";

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
  const { user } = useUser();

  if (!isVisible) {
    return null;
  }

  //handles the saving of the profile picture to the profile
  const handleSaveClick = async (e) => {
    // update profile information here with new values

    e.preventDefault();

    let data = new FormData();
    data.append("image", newProfilePicture);
    await postProfilePic(data, user);
    try {
      handleSave(newProfilePicture);
    } catch {
      console.error("error:", error);
    }

    window.location.reload();
  };

  // handles the changing of the password when the change password btn is clicked
  const handleChangePWClick = async (e) => {
    e.preventDefault();

    if (
      newPassword === "" ||
      CurrentPW === "" ||
      ConfirmPassword === "" ||
      newPassword !== ConfirmPassword
    ) {
      setError(true);
    } else {
      setError(false);
      try {
        const response = await changePassword(CurrentPW, newPassword, user);
        console.log(response.data);
        setCurrentPW("");
        setNewPW("");
        setConfirmPW("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  //// hides the pop-up
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
