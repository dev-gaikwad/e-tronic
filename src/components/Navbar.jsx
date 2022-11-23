import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as ExploreIcon } from '../assets/svg/compass.svg';
import { ReactComponent as OffersIcon } from '../assets/svg/offers.svg';
import { ReactComponent as ProfileIcon } from '../assets/svg/profile.svg';

import '../css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) return true;
  };

  return (
    <footer className='navbar'>
      <nav className='navbar-bottom'>
        <ul className='nav-list-items'>
          <li className='nav-list-item' onClick={() => navigate('/offers')}>
            <OffersIcon
              fill={
                pathMatchRoute('/offers')
                  ? 'var(--main-color)'
                  : 'var(--light-gray)'
              }
              height='30px'
              width='30px'
            />
            <p
              className={
                pathMatchRoute('/offers')
                  ? 'nav-list-item-name-active'
                  : 'nav-list-item-name'
              }
            >
              Offers
            </p>
          </li>
          <li className='nav-list-item' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={
                pathMatchRoute('/') ? 'var(--main-color)' : 'var(--light-gray)'
              }
              height='30px'
              width='30px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'nav-list-item-name-active'
                  : 'nav-list-item-name'
              }
            >
              Explore
            </p>
          </li>
          <li className='nav-list-item' onClick={() => navigate('/profile')}>
            <ProfileIcon
              fill={
                pathMatchRoute('/profile')
                  ? 'var(--main-color)'
                  : 'var(--light-gray)'
              }
              height='30px'
              width='30px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'nav-list-item-name-active'
                  : 'nav-list-item-name'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
