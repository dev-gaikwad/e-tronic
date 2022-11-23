import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase.config';

import { ReactComponent as VisibilityIcon } from '../assets/svg/visibility.svg';
import { ReactComponent as ArrowBtn } from '../assets/svg/arrowbtn.svg';
import '../css/Sign.css';
import { toast } from 'react-toastify';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { name, email, password } = formData;

  const onChangeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const dataCopy = { ...formData };
      delete dataCopy.password;
      dataCopy.timestamp = serverTimestamp();

      await setDoc(doc(database, 'users', user.uid), dataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='page-container'>
        <header>
          <h1 className='page-header'>Welcome!</h1>
        </header>
        <form onSubmit={onSubmitHandler}>
          <input
            type='text'
            className='name-input'
            id='name'
            placeholder='Name'
            value={name}
            onChange={onChangeHandler}
          />
          <input
            type='email'
            className='email-input'
            id='email'
            placeholder='Email'
            value={email}
            onChange={onChangeHandler}
          />
          <div className='password-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='password-input'
              id='password'
              placeholder='Password'
              value={password}
              onChange={onChangeHandler}
            />

            <div
              className='show-password'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <VisibilityIcon />
            </div>
          </div>

          <div className='sign-container'>
            <p className='sign-text'>Sign Up</p>
            <button className='sign-btn'>
              <ArrowBtn
                fill='var(--light-background-color)'
                height='30px'
                width='30px'
              />
            </button>
          </div>
        </form>

        <div className='alternate-option-container'>
          <p>Already have an account?</p>
          <Link to='/signin' className='link'>
            Sign In Instead
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
