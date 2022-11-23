import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase.config';

import '../css/Profile.css';
import { toast } from 'react-toastify';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      // update in firebase
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firestore database
        const user = doc(database, 'users', auth.currentUser.uid);

        await updateDoc(user, {
          name,
        });

        toast.success('Name Changed Successfully');
      }
    } catch (error) {
      toast.error("Couldn't update details");
    }
  };

  const detailsChangeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
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

        <section>
          <div className='profile-details-header'>
            <p className='profile-details-text'>Personal Details</p>
            <button
              className='change-btn'
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prev) => !prev);
              }}
            >
              {changeDetails ? 'Done' : 'Change'}
            </button>
          </div>

          <div className='profile-card'>
            <form>
              <input
                type='text'
                id='name'
                className={
                  changeDetails ? 'profile-name-active' : 'profile-name'
                }
                disabled={!changeDetails}
                value={name}
                onChange={detailsChangeHandler}
              />

              <input
                type='text'
                id='email'
                className='profile-email'
                disabled={true}
                value={email}
                onChange={detailsChangeHandler}
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
