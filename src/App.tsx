import React, { useState } from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import NausList from './components/NausList';
import { NausProvider } from './context/NausContext';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup'; // Import the Signup component

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/login"
          element={<>
            <Login setLoggedIn={setLoggedIn} />
            <Signup /> {/* Display Signup component below the Login component */}
          </>}
        />
        <Route
          path="starships"
          element={
            isLoggedIn ? (
              <>
                <Header setLoggedIn={setLoggedIn} />
                <NausProvider>
                  <div>
                    <NausList />
                  </div>
                </NausProvider>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;