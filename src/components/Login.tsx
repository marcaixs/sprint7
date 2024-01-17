import React, { ChangeEvent, FormEvent, useState } from 'react';

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setLoggedIn }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (!res) {
        throw new Error("Authentication failed");
      }
      return res.json();
    })
      .then((data) => {
        console.log(data.user);
        setLoggedIn(true); 
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  
  return (
    <div>
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          className='text-black'
          onChange={(e) => handleChange(e)}
        ></input>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;