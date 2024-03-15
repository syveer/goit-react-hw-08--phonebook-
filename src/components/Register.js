import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const REGISTER_URL = '/signup';

const Register = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(pwd.length >= 8);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validEmail || !validPwd || !validMatch) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      await axios.post(REGISTER_URL, JSON.stringify({ email, pwd }), {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(true);
      setEmail('');
      setPwd('');
      setMatchPwd('');
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setErrMsg('Email Already Registered');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <button onClick={() => navigate('/login')}>Sign In</button>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={pwdRef}
              onChange={e => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <label htmlFor="matchPassword">Confirm Password:</label>
            <input
              type="password"
              id="matchPassword"
              ref={matchPwdRef}
              onChange={e => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
            />
            <button disabled={!validEmail || !validPwd || !validMatch}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
