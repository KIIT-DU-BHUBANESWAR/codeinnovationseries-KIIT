import React, { useState, useEffect } from 'react';

import { Modal } from 'react-bootstrap';
import ResgisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { isAuthenticated, signout } from './helper';
import Navbar from './Navbar';
import { withRouter, Redirect } from 'react-router-dom';

const TopHeader = () => {
  const [show, setShow] = useState(false);
  const [showlogin, setshowlogin] = useState(false);
  const [reload, setreload] = useState();
  const handleClosesignup = () => setShow(false);
  const handleShowsignup = () => setShow(true);

  const handleCloselogin = () => setshowlogin(false);
  const handleShowlogin = () => setshowlogin(true);
  const logout = async () => {
    await signout();
    window.location = '/';
  };
  useEffect(() => {
    return () => {
      setreload(false);
    };
  }, [reload]);
  return (
    <React.Fragment>
      <div
        className='top-header bg-white'
        style={{ lineHeight: '0', paddingTop: '2px' }}
      >
        <div className='container1'>
          <div className='row no-gutters'>
            <div className='col-lg-4 text-center text-lg-left'>
              <a
                className='text-color mr-3 header-font'
                href='callto:+443003030266'
              >
                <strong>CALL</strong> +44 300 303 0266
              </a>
              <ul className='list-inline d-inline'>
                <li className='list-inline-item mx-0'>
                  <a
                    className='d-inline-block header-font p-2 text-color'
                    href='/'
                  >
                    <i className='ti-facebook'></i>
                  </a>
                </li>
                <li className='list-inline-item mx-0'>
                  <a
                    className='d-inline-block header-font p-2 text-color'
                    href='/'
                  >
                    <i className='ti-twitter-alt'></i>
                  </a>
                </li>
                {/* <li className="list-inline-item mx-0"><a className="d-inline-block p-2 text-color" href="/"><i className="ti-spanedin"></i></a></li> */}
                <li className='list-inline-item mx-0'>
                  <a
                    className='d-inline-block p-2 header-font text-color'
                    href='/'
                  >
                    <i className='ti-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-lg-8 text-center text-lg-right'>
              <ul
                className='list-inline'
                style={{ marginBottom: '0', paddingTop: '5px' }}
              >
                {isAuthenticated() ? (
                  <li className='list-inline-item'>
                    <span
                      className='text-uppercase text-color  header-font p-sm-2 py-2 px-0 d-inline-block'
                      onClick={logout}
                      data-toggle='modal'
                      data-target='#signupModal'
                      style={{ cursor: 'pointer' }}
                    >
                      Log Out
                    </span>
                  </li>
                ) : (
                  <span>
                    <li className='list-inline-item'>
                      <span
                        className='text-uppercase text-color header-font p-sm-2 py-2 px-0 d-inline-block'
                        onClick={handleShowlogin}
                        data-toggle='modal'
                        data-target='#loginModal'
                        style={{ cursor: 'pointer' }}
                      >
                        Login
                      </span>
                    </li>
                    <li className='list-inline-item'>
                      <span
                        className='text-uppercase text-color header-font p-sm-2 py-2 px-0 d-inline-block'
                        onClick={handleShowsignup}
                        data-toggle='modal'
                        data-target='#signupModal'
                        style={{ cursor: 'pointer' }}
                      >
                        Register
                      </span>
                    </li>
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*SIGN UP MODAL*/}
      <Modal show={show} onHide={handleClosesignup}>
        <ResgisterModal></ResgisterModal>
      </Modal>

      {/*LOGIN MODAL*/}
      <Modal show={showlogin} onHide={handleCloselogin}>
        <LoginModal></LoginModal>
      </Modal>
    </React.Fragment>
  );
};
export default withRouter(TopHeader);
