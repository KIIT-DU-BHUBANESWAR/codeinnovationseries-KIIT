import React, { useState } from 'react';
import { addContact } from './helper';
import { toast } from 'react-toastify';

const ContactSection = () => {
  const [contactForm, setcontactForm] = useState({});
  const handleChange = (e) => {
    setcontactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(contactForm);
    addContact(contactForm).then((data) => {
      if (!data.error) {
        toast('We will get back to you soon!!', { type: 'success' });
        setcontactForm({});
      } else {
        toast('Cannot send your query right now. Contact something@gmail.com', {
          type: 'error',
        });
      }
    });
  };
  return (
    <React.Fragment>
      <section className=' bg-contact  '>
        <div className=' '>
          <div className='row bannerStyle1 overlay justify-content-between contact-banner m-0 p-5  align-items-center'>
            <div className='col-lg-4 px-4 mb-4 mb-lg-0'>
              <div className='card contact-form p-5'>
                <form onSubmit={onSubmit}>
                  <p className='mb-4'>
                    Fill up this form and we will get back to you soom
                  </p>
                  <input
                    type='text'
                    className='form-control mb-3'
                    id='name'
                    name='name'
                    onChange={handleChange}
                    value={contactForm.name}
                    placeholder='Your Name'
                  ></input>
                  <input
                    type='email'
                    className='form-control mb-3'
                    id='email'
                    name='email'
                    onChange={handleChange}
                    value={contactForm.email}
                    placeholder='Your Email'
                  ></input>
                  <input
                    type='text'
                    className='form-control mb-3'
                    id='subject'
                    name='subject'
                    placeholder='Subject'
                    onChange={handleChange}
                    value={contactForm.subject}
                  ></input>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control mb-3'
                    placeholder='Your Message'
                    onChange={handleChange}
                    value={contactForm.message}
                  ></textarea>
                  <button type='submit' value='send'>
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
            <div className='col-lg-7 '>
              <h1 className='text-white'>Reach us </h1>
              <p className='text-white font-weight-bold'>
                We are here to support you any time you need.
              </p>
              <div className='row mx-0 text-white'>
                <div className='col-sm-12 p-1 col-md-12 contact-info align-items-center d-flex'>
                  <i class='fas fa-envelope'></i>{' '}
                  <p className='my-0 mx-2 text-white'> something@gmail.com</p>
                </div>
                <div className='col-sm-12 p-1 col-md-12 contact-info align-items-center d-flex'>
                  <i class='fas fa-phone'></i>{' '}
                  <p className='my-0 mx-2 text-white'> +91 7749803312</p>
                </div>
                <div className='col-sm-12 p-1 col-md-12 contact-info align-items-center d-flex'>
                  <i class='fas fa-map-marker-alt'></i>{' '}
                  <p className='my-0 mx-2 text-white'>
                    {' '}
                    122 Mahatma Gandhi Road Kolkata 70029
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='p-0 col-sm-12 text-center'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d921.3887834583767!2d88.35300802189346!3d22.5208683281631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02772dec279a79%3A0x70f76dfe23cf62cb!2s122%2C%20169%2F1%2C%20Motilal%20Nehru%20Rd%2C%20Dover%20Terrace%2C%20Ballygunge%2C%20Kolkata%2C%20West%20Bengal%20700029!5e0!3m2!1sen!2sin!4v1601307789197!5m2!1sen!2sin'
              width='10800'
              height='450'
              frameborder='0'
              style={{ border: 0, maxWidth: '98%', margin: 'auto' }}
              allowfullscreen=''
              aria-hidden='false'
              tabindex='0'
            ></iframe>
          </div>
        </div>
        <div className='text-center'></div>
      </section>
    </React.Fragment>
  );
};

export default ContactSection;
