import React, {useState, useEffect} from 'react';
import './ProfilePage.css';
import EditProfilePopUp from './EditProfilePopUp';
import { useUser} from '../../utils/UserContext';




const ProfilePage = () => {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [age, setAge] = useState('11/12/2023');
    const [profilePicture, setProfilePicture] = useState(null);
    const [about, setAbout] = useState('This is my profile.');

    const { user, setUser } = useUser();
    const axios = require('axios');

    
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/Profile', {
            headers: {
              authorization: `${user}`,
            },
          })
            .then(response=>{
               // setProfilePicture({response});
               console.log(response);
            })
            .catch(error =>{
                console.log(error);
            });

    },[]);

    const handleEditClick = () => {
      setIsPopUpVisible(true);
      setEditing(true);
    };
  
    const handleClosePopUp = () => {
      setIsPopUpVisible(false);
      setEditing(false);
    };

    const handleSave = async(newAge, newPicture,newAbout) => {
        setAge(newAge);
        if (newPicture) {
            setProfilePicture(newPicture);
            try{
                const response = await axios.post('http://localhost:8000/api/user/uploadProfilePic',{authorization: user
       
                });
              } catch (error){
                console.error(error);
                alert('Profile picture upload failed. Please try again.');
              } 
        }
        setAbout(newAbout);
        setEditing(false);
    };



    

    return(
    <div>
        <div className="profile-page">
            <div className="profile-portion">
                <div className="profile-top">
                    <div className="Profile-Background">
                        <img id="background-img" src="" alt="" srcset=""/>
                        <div className="Profile-Picture">
                            <img id="profile-img" src={profilePicture} alt="" srcset=""/>
                        </div>
                        <h1 class="user-name-title">TEST_USER_NAME_34</h1>
                        <button className="Edit-Profile-Button" onClick={handleEditClick}>Edit Profile</button>   
                        <p class="age-title"><b>DOB:</b>&nbsp;{age}</p>                 
                        <p class="country-title"><b>Account Created:</b>&nbsp;{age}</p>        
                    </div>
                </div>
                <div className= "profile-middle">
                    <div className="profile-info">
                        <h2 class="About-title">About</h2>
                        <p className="about-text">{about}</p>
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="profile-left">
                        <div className="post-list">
                            <h2 class="About-title">My Posts</h2>
                        </div>
                    </div> 
                    <div className="profile-right">
                        <div className="post-list">
                            <h2 class="About-title">Saved Posts</h2>
                        </div>
   
                    </div>
                </div>
      
            </div>
        </div>
        <EditProfilePopUp isVisible={isPopUpVisible} onClose={handleClosePopUp} handleSave={handleSave} editing={editing} age={age} profilePicture={profilePicture} about={about} />
    </div> 
    );
};

export default ProfilePage

