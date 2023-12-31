import React, { useState, useEffect, useRef } from 'react';
import { store } from '../store/';

const Header = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [data, setData] = useState('');
  const authToken = store.getState().token;
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);

  useEffect(() => {
    async function authenticateUser() {
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
          setData(data.body);
        } else {
          // Gérez les erreurs de connexion
          console.log('Échec de la connexion');
        }
      } catch (error) {
        console.log('Erreur lors de la connexion', error);
      }
    }
    authenticateUser();
  }, [authToken]);

  const toggleForm = () => {
    // Inversez la valeur de displayForm lorsqu'on clique sur le bouton
    setDisplayForm(!displayForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    //console.log(JSON.stringify({ firstName, lastName }));
    toggleForm()
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      //console.log(response);
      if (response.ok) {
        const data = await response.json();
        setData(data.body);
      } else {
        // Gérez les erreurs de connexion
        console.log('Échec de la connexion');
      }
    } catch (error) {
      console.log('Erreur lors de la connexion', error);
    }
  };

  return (
    <div className="header">
      {displayForm ? (
        <form className="edit-name">
          <h1>Welcome back</h1>
          <div className="edit-name__container">
            <div className="edit-name__container-left">
              <div className="input-wrapper">
                <input
                  type="text"
                  ref={firstNameRef}
                  placeholder={data.firstName}
                />
              </div>
              <button type="submit" className="edit-button" onClick={handleSubmit}>
                Save
              </button>
            </div>
    
            <div className="edit-name__container-right">
              <div className="input-wrapper">
                <input
                  type="text"
                  ref={lastNameRef}
                  placeholder={data.lastName}
                />
              </div>
              <button type ="button" className="edit-button" onClick={toggleForm}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <h1>Welcome back<br />
            <span>{data.firstName} {data.lastName}!</span>
          </h1>
          <button type="button" className="edit-button" onClick={toggleForm}>Edit Name</button>
        </div>
      )}
    </div>
  );
};

export default Header;
