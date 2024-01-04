import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/login.css';
import notesCover from '../Images/back.jpg';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    loginType: '',
  });

  const handleInputChange = (evt) => {
    setLoginData({
      ...loginData,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleRadioChange = (evt) => {
    setLoginData({
      ...loginData,
      loginType: evt.target.value,
    });
  };

  const validate = () => {
    const { username, password, loginType } = loginData;

    if (!username || !password) {
      alert('Username / Password Missing!!!');
    } else {
      if (username === 'ST1234' && password === '1234' && loginType === 'Student') {
        history.push('/Student');
      } else if (username === 'IN1234' && password === '1234' && loginType === 'Institute') {
        history.push('/Institute');
      } else {
        alert('Wrong Username or Password');
      }
    }
  };

  return (
    <div className="container signInCard center">
      <div className="card setCardWidth">
        <div className="card-image">
          <img src={notesCover} alt="Notes" className="cardImageHeight" />
        </div>
        <div className="signInContainer card-content">
          <h4 className="grey-text card-title">Sign In</h4>
          <form className="signInForm">
            <div className="input-field">
              <i className="material-icons prefix grey-text text-darken-3">fingerprint</i>
              <input
                type="text"
                id="username"
                onChange={handleInputChange}
                value={loginData.username}
              />
              <label htmlFor="loginID">Login ID</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix grey-text text-darken-3">lock</i>
              <input
                id="password"
                type="password"
                onChange={handleInputChange}
                value={loginData.password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field row">
              <p className="col s4">
                <label>
                  <input
                    name="dept"
                    type="radio"
                    value="Student"
                    onChange={handleRadioChange}
                    checked={loginData.loginType === 'Student'}
                  />
                  <span>Student</span>
                </label>
              </p>
              <p className="col s4">
                <label>
                  <input
                    name="dept"
                    type="radio"
                    value="Institute"
                    onChange={handleRadioChange}
                    checked={loginData.loginType === 'Institute'}
                  />
                  <span>Institute</span>
                </label>
              </p>
            </div>
            <div className="input-field center card-action">
              <button className="btn grey darken-3" type="button" onClick={validate}>
                Sign In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
