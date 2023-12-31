import { Link } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'; 
import { store } from '../service/store';
import { destroyToken } from '../service/store';
import React, { useState, useEffect} from 'react';

const Navbar = () => {

  // Accédez à l'état du store Redux
  const authToken = store.getState().token;
  const [data, setData] = useState('');

  useEffect(() => {
    async function authenticateUser() {
      if (authToken) {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setData(data.body)
          } else {
            // Gérez les erreurs de connexion
            console.log('Échec de la connexion');
          }
        } catch (error) {
          console.log('Erreur lors de la connexion', error);
        }
      }
    }
    authenticateUser();
  }, [authToken]);

  const handleLogout = () => {
    store.dispatch(destroyToken());
  };

  return (
    <nav className="main-nav">
      <Link to="/home" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {authToken ? (
          // Si le token est présent, affichez le lien de déconnexion
          <div className='main-nav-items'>
            <div className='main-nav-item'>
              <FontAwesomeIcon icon={faUserCircle} className="icon"/>
              {data.firstName} 
            </div>
            <Link to="/login" className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon"/>
              Sign out
            </Link>
          </div>
          
        ) : (
          // Si le token n'est pas présent, affichez le lien de connexion
          <Link to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle}className="icon" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;





