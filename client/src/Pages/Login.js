import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/Login.css';
import { apiHost } from '../Utils/Constants';
import { Redirect } from 'react-router-dom'

async function loginUser(credentials) {
  return fetch(apiHost + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken, setSignup }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!!username && !!password) {
      const token = await loginUser({
        email: username,
        password
      });
      console.log("token", token)
      setToken(token);
    } else {
      alert("Please enter credentials!")
    }
  }

  const onSignup = (e) => {
    e.preventDefault();
    setSignup(true);
    return <Redirect to='/signup' />
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="login-buttons">
          <button type="submit" className="submit">Submit</button>
          <button className="signup" onClick={onSignup}>Signup</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setSignup: PropTypes.func.isRequired,
}