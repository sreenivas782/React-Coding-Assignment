import React, { useState } from 'react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
       
        const token = data.token;
        const usersResponse = await fetch('https://reqres.in/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const usersData = await usersResponse.json();
        console.log(usersData); 
      } else {
       
        setEmailError('');
        setPasswordError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main-card">
      <img src="logo.jpg" alt="img" />
      <p>Hello there, Sign in to Continue </p>
      <br />
      <br />
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
        <input type="checkbox" />
        <span>
          By creating or logging into an account, you
          <br />
          are agreeing with our <b>Terms & Conditions</b>
          <br />
          and <b>Privacy Policies</b>
        </span>
        <br />
        <br />
        <button className="btn">Next</button>
      </form>
      <br />
      <br />
      <br />
      <p className='link'>Sign in With Company SSO </p>
      {passwordError && <div className="error">{passwordError}</div>}
    </div>
  );
};

export default LoginPage;
