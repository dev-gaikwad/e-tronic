import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../assets/svg/google.svg';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { database } from '../firebase.config';

import '../css/OAuth.css';
import { toast } from 'react-toastify';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const googleClickHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const docRef = doc(database, 'users', result.user.uid);
      const docSnap = getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(database, 'users', result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (error) {
      toast.error("Couldn't Authenticate with Google");
    }
  };
  return (
    <div className='social-login-container'>
      <div className='social-login' onClick={googleClickHandler}>
        <GoogleIcon height='30px' width='30px' />
        <p>Sign {location.pathname === '/signin' ? 'in' : 'up'} with Google</p>
      </div>
    </div>
  );
}

export default OAuth;
