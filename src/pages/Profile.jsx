import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import '../css/Profile.css';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const logoutHandler = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <>
      <div className='page-container'>
        <header className='profile-header'>
          <p className='page-header'>My Profile</p>
          <button type='button' className='logout-btn' onClick={logoutHandler}>
            Logout
          </button>
        </header>
      </div>
    </>
  );
}

export default Profile;
