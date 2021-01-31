import React from 'react';
import $ from 'jquery';
import TopHeader from './TopHeader.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

import Title from './Title.js';
import AllEvents from './AllEvents.js';

const EventPage = () => {
  return (
    <React.Fragment>
      <header className='sticky-top header'>
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar events='active'></Navbar>
      </header>
      {/* <!-- /header --> */}
      <Title
        title='Upcoming Events'
        body='Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others.'
      ></Title>

      <AllEvents></AllEvents>

      <Footer></Footer>
    </React.Fragment>
  );
};

export default EventPage;
