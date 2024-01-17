import {  useNavigate } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';

interface HeaderProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(false);
  const isLoggedIn = true; // Replace this with your actual logic to determine if the user is logged in

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    closeLogin();
  };

  return (
    <>
      <div className="flex justify-center items-center mb-2 gap-6 border-t-2 border-b-2 border-neutral-800">
        
        {!isLoggedIn && (
          <>
            <span
              className="text-xl text-white font-mono border-r-2 border-l-2 border-neutral-800 px-6 py-2 cursor-pointer"
              onClick={toggleLogin}
            >
              Login
            </span>
          </>
        )}
        {isLoggedIn && (
          <span
            className="text-xl text-white font-mono border-r-2 border-neutral-800 pr-6 py-2 cursor-pointer"
            onClick={handleLogout}
          >
            LOGOUT
          </span>
        )}
      </div>

      {showLogin && <Login setLoggedIn={handleLoginSuccess} />}
    </>
  );
};

export default Header;