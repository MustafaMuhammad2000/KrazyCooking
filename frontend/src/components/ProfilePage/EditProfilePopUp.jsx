import React, {useState} from 'react';
import './EditProfilePopUp.css';
import { useUser} from '../../utils/UserContext';

const EditProfilePopUp = ({ isVisible, onClose ,handleSave, editing, age,profilePicture,about}) => {
  const [CurrentPW, setCurrentPW] = useState('');
  const [newPassword, setNewPW] = useState('');
  const [ConfirmPassword, setConfirmPW] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newAbout, setNewAbout] = useState('');
  const [error, setError] = useState(false);
  const { user, setUser } = useUser();

  const axios = require('axios');

  if (!isVisible) {
    return null;
  }

  const handleSaveClick = () => {
    // update profile information here with new values
    handleSave(newAge, newProfilePicture, newAbout);
    const newPictureUrl = newProfilePicture ? URL.createObjectURL(newProfilePicture) : profilePicture;
    setNewProfilePicture(newPictureUrl);
    onClose(); // hide the pop-up

  };

  const handleChangePWClick = (e) => {
    // update profile information here with new values
    e.preventDefault();
  
    if (newPassword === '' || CurrentPW === '' || ConfirmPassword === '') {
    setError(true);
    } else {
   // setSubmitted(true);
    setError(false);
    try{
      axios.patch('http://localhost:8000/api/user/updatePassword',{ authorization: user,
        currentPassword: `${CurrentPW}`,
        newPassword: `${newPassword}`,
      });
    } catch (error){
      console.error(error);
      alert('Password change failed. Please try again.');
    } 
    }
    alert('Password change was successful.');
/*
      if (newPicture) {

          try{
              const response = await axios.post('http://localhost:8000/api/user/uploadProfilePic',{authorization: user
     
              });
            } catch (error){
              console.error(error);
              alert('Profile picture upload failed. Please try again.');
            } 
      }*/
  };


  const handleCloseClick = () => {
    onClose(); // hide the pop-up
  };



  return (
    <div className="popup">
        <div className="inside-pop">
            <div className={`Edit-Profile-Pop-Up ${isVisible ? 'visible' : ''}`}>
            <h2>Edit Profile</h2>
            <form>
                <br/>
                <label htmlFor="age-input">DOB:</label>
                <input
                id="age-input"
                type="date"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
                <label htmlFor="profile-picture-input">Profile Picture:</label>
                <input
                id="profile-picture-input"
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if  (file && file.type.substring(0,5)==="image"){
                        setNewProfilePicture(file);
                    }else{
                        setNewProfilePicture(null);
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => {
                    setNewProfilePicture(reader.result);
                    };
                    reader.readAsDataURL(file);
                }}
                />
                <br/>
                <br/>
                <br/>
                <label htmlFor="about-input">About:</label>
                <br/>
                <textarea
                id="about-input"
                value={newAbout}
                onChange={(e) => setNewAbout(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
                <label htmlFor="country-input"><b>Change Password:</b></label>
                <br/>
                <label htmlFor="country-input">Current Password:</label>
                <input
                id="currentpw-input"
                type="password"
                value={CurrentPW}
                onChange={(e) => setCurrentPW(e.target.value)}
                />
                <br/>
                <label htmlFor="country-input">New Password:</label>
                <input
                id="newpw-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPW(e.target.value)}
                />
                <br/>
                <label htmlFor="country-input">Confirm Password:</label>
                <input
                id="confirmpw-input"
                type="password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPW(e.target.value)}
                />
                <br/>
                <button className="change-btn" onClick={handleChangePWClick}><b>Change</b></button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </form>
            <button onClick={handleSaveClick}>Save</button>
            </div>
            <button className="close-btn" onClick={handleCloseClick}><b>X</b></button>
        </div>
    </div>
  );
};

export default EditProfilePopUp;