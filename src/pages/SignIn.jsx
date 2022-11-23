import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { ReactComponent as VisibilityIcon } from '../assets/svg/visibility.svg';
import { ReactComponent as ArrowBtn } from '../assets/svg/arrowbtn.svg';
import '../css/Sign.css';
import { toast } from 'react-toastify';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Invalid User Credentials');
    }
  };

  return (
    <>
      <div className='page-container'>
        <header>
          <h1 className='page-header'>Welcome Back!</h1>
        </header>

        <form onSubmit={onSubmitHandler}>
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

          <Link to='/forgot-password' className='forgot-password-link'>
            Forgot Password?
          </Link>

          <div className='sign-container'>
            <p className='sign-text'>Sign In</p>
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
          <p>Don't have an account?</p>
          <Link to='/signup' className='link'>
            Sign Up Instead
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
