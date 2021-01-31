/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from './helper';
import { Modal, Button } from 'react-bootstrap';

import { toast } from 'react-toastify';

const LoginModal = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const loadingMessage = () =>
    loading && (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left mt-2'>
          <div className='alert alert-info'>
            <h4>Loading...</h4>
          </div>
        </div>
      </div>
    );

  const errorMessage = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });
    signin({ email, password })
      .then((data) => {
        if (data)
          if (data.error) {
            setValues({
              ...values,

              loading: false,
            });
            toast('Unable to locate the user', { type: 'error' });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          }
      })
      .catch(console.log('Error in signin'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to='/dashboard-teacher'></Redirect>;
      } else if (user && user.role === 2) {
        return <Redirect to='/dashboard-admin'></Redirect>;
      } else {
        return <Redirect to='/dashboard'></Redirect>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/'></Redirect>;
    }
  };
  const login = () => (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className='modal-header border-0'>
            <h3>Login</h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='modal-body'>
          <form action='#' className='row'>
            <div className='col-12'>
              <input
                type='email'
                className='form-control mb-3'
                id='signupEmail'
                name='signupEmail'
                placeholder='Email'
                onChange={handleChange('email')}
                value={email}
              ></input>
            </div>
            <div className='col-12'>
              <input
                type='password'
                className='form-control mb-3'
                id='signupPassword'
                name='signupPassword'
                placeholder='Password'
                onChange={handleChange('password')}
                value={password}
              ></input>
            </div>
            <div className='col-12'>
              {loading ? (
                <button
                  disabled
                  className='hvr-bounce-to-top breathe-animation'
                >
                  Loading
                </button>
              ) : (
                <button
                  type='submit'
                  onClick={onSubmit}
                  className='hvr-bounce-to-top'
                >
                  LOG IN
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal.Body>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      {/* {loadingMessage()} */}
      {/* {errorMessage()} */}
      {login()}
      {performRedirect()}
    </React.Fragment>
  );
};
export default LoginModal;
