import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { isAuthenticated } from './helper';

const NavBar = (props) => {
  return (
    <React.Fragment>
      <div className={`navigation w-100 ${props.active}`}>
        <div className='container1'>
          <Navbar collapseOnSelect expand='lg'>
            <Navbar.Brand>
              <a className='navbar-brand' href='/'>
                <img src={logo} alt='logo' style={{ width: '18vmax' }}></img>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <div className='mr-auto' style={{ lineHeight: '0' }}>
                <ul className='navbar-nav ml-auto text-center'>
                  <li className={`nav-item ${props.home}`}>
                    <Link className='nav-link' to='/'>
                      HOME
                    </Link>
                  </li>

                  <li className={`nav-item ${props.courses}`}>
                    <Link className='nav-link' to='/course'>
                      COURSES
                    </Link>
                  </li>
                  {isAuthenticated() && (
                    <li className={`nav-item ${props.notice}`}>
                      <Link className='nav-link' to='/notice'>
                        NOTICE
                      </Link>
                    </li>
                  )}

                  <li className={`nav-item ${props.about}`}>
                    <Link className='nav-link' to='/about'>
                      ABOUT
                    </Link>
                  </li>
                  {/* <li className={`nav-item ${props.events}`}>
            <Link className="nav-link" to="/event">EVENTS</Link>
            </li> */}

                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className={`nav-item ${props.dashboard}`}>
                      <Link className='nav-link' to='/dashboard'>
                        DASHBOARD
                      </Link>
                    </li>
                  )}
                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className={`nav-item ${props.dashboard}`}>
                      <Link className='nav-link' to='/dashboard-teacher'>
                        DASHBOARD
                      </Link>
                    </li>
                  )}
                  {isAuthenticated() && isAuthenticated().user.role === 2 && (
                    <li className={`nav-item ${props.dashboard}`}>
                      <Link className='nav-link' to='/dashboard-admin'>
                        DASHBOARD
                      </Link>
                    </li>
                  )}

                  <li className={`nav-item ${props.contact}`}>
                    <Link className='nav-link' to='/contact'>
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
