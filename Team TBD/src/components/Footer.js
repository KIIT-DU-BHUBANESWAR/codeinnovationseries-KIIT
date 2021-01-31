import React, { useState, useEffect } from 'react';
import logo from '../images/logo-white.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addSubcriber } from './helper';

const Footer = () => {
  const [value, setValue] = useState({ email: '' });
  const handleChange = (event) => {
    setValue({
      ...value,
      email: event.target.value,
    });
  };
  const emailValidator = (email) => {
    return (
      email.length !== '' &&
      (email.match(/[^a-zA-Z0-9@.]+/) !== null ||
        email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+[.][a-zA-Z]+/) === null)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailValidator(value.email)) {
      toast('Please fill the email or enter a proper email ID.', {
        type: 'error',
      });
      return;
    } else {
      addSubcriber(value)
        .then((data) => {
          console.log('email data :::', data);
          if (!data || data?.error) {
            toast(`${data.error}`, {
              type: 'error',
            });
            return;
          }
          toast('Subcriber Added Successfully', {
            type: 'success',
          });
        })
        .catch((error) =>
          toast('Something went wrong ! We are trying to figure out.', {
            type: 'error',
          })
        );
    }
  };

  return (
    <React.Fragment>
      <footer>
        <div className='newsletter'>
          <div className='bg-primary '>
            <div className='row py-2 mx-0'>
              <div className='col-lg-5 col-md-8 col-sm-8 mx-auto py-5 newsletter-block'>
                <div className='text-center'>
                  <h3 className='text-white text-center'>
                    Subscribe To Our Newsletter
                  </h3>
                  <form onSubmit={onSubmit}>
                    <div className='input-wrapper'>
                      <input
                        type='email'
                        className='form-control border-0'
                        id='newsletter'
                        name='newsletter'
                        onChange={handleChange}
                        placeholder='Enter Your Email...'
                      />
                    </div>
                    <button
                      type='submit'
                      className='hvr-bounce-to-top my-3 border-curved'
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- footer content --> */}
        <div className='newsfooter bg-footer section border-bottom'>
          <div className='container1'>
            <div className='row'>
              <div
                className='col-lg-4 col-sm-8 mb-5 mb-lg-0'
                style={{ margin: 'auto', marginLeft: '0px' }}
              >
                {/* <!-- logo --> */}
                <Link className='logo-footer' to='/'>
                  <img className='img-fluid w-100' src={logo} alt='logo' />
                </Link>
              </div>
              <div className='col-lg-4 col-sm-8 mb-5 pr-5 pl-5 pt-3 mb-lg-0 text-left'>
                <h4 className='text-white mb-3'>About Us</h4>
                <hr />
                <p className='footer-text text-justify'>
                  Our courses offer a good compromise between the continuous
                  assessment favoured by some universities and the emphasis
                  placed on final exams by others.
                </p>
              </div>

              {/* <!-- Reach --> */}
              <div className='col-lg-4 col-sm-8 text-left pr-5 pt-3 pl-5 mb-5 mb-md-0'>
                <h4 className='text-white mb-3'>Reach us</h4>
                <hr />
                <ul className='list-unstyled footer-text'>
                  <ul className='list-unstyled'>
                    <li className='mb-2 '>
                      20khb, Kolkata, Kolkata,West Bengal
                    </li>
                    <li className='mb-2'>+1 (2) 345 6789</li>
                    <li className='mb-2'>+1 (2) 345 6789</li>
                    <li className='mb-2'>contact@yourdomain.com</li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- copyright --> */}
        <div className='copyright pt-2 bg-footer'>
          <div className='container1'>
            <div className='row '>
              <div className='col-sm-7 text-sm-left text-center'>
                <p className='mb-0 footer-text'>
                  Designed and maintained by{' '}
                  {/* <script>
                    var CurrentYear = new Date().getFullYear()
                    document.write(CurrentYear)
                  </script> */}
                  {/* ©{" "} */}
                  Infinite Loop
                </p>
              </div>

              <div className='col-sm-4 text-sm-right text-center'>
                <ul className='list-inline'>
                  <li className='list-inline-item'>
                    <a className='d-inline-block p-2' href='/'>
                      <i className='ti-facebook text-primary'></i>
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='d-inline-block p-2' href='/'>
                      <i className='ti-twitter-alt text-primary'></i>
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='d-inline-block p-2' href='/'>
                      <i className='ti-linkedin text-primary'></i>
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='d-inline-block p-2' href='/'>
                      <i className='ti-instagram text-primary'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
