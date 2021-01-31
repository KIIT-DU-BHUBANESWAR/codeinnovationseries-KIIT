import React from 'react';
import $ from 'jquery';
import TopHeader from './TopHeader.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import AllCourseList from './AllCourseList.js';
import Title from './Title.js';

const Payment = () => {
  return (
    <React.Fragment>
      <header className='sticky-top header'>
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar courses='active'></Navbar>
      </header>
      {/* <!-- /header --> */}
      <Title
        title='Our Courses'
        body='Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others.'
      ></Title>
      <AllCourseList></AllCourseList>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Payment;
