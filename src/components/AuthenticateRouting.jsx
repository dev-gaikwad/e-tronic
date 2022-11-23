import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AuthenticateRouting() {
  const { loggedIn, checkStatus } = useAuth();

  if (checkStatus) return <h3>Loading...</h3>;

  return <>{loggedIn ? <Outlet /> : <Navigate to='/signin' />}</>;
}

export default AuthenticateRouting;
