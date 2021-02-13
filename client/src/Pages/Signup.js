import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/Login.css';
import { apiHost } from '../Utils/Constants';
import { Redirect } from 'react-router-dom'

async function signupUser(data) {
  return fetch(apiHost + '/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
}

export default function Signup({ setToken, setSignup }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!!firstName && !!password && !!email) {
      setSigningup(true);
      const token = await signupUser({
        firstName,
        lastName,
        email,
        password,
      });
      console.log("token signup", token)
      setToken(token);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSignup(false);
      return <Redirect to='/login' />
    } else {
      if (!(!!firstName)) {
        alert("First Name is required");
      } else if (!(!!firstName)) {
        alert("Email is required");
      } else {
        alert("Password is required");
      }
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit" className="login-buttons">
            {signingUp ? "Signing up..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
  setSignup: PropTypes.func.isRequired,
}