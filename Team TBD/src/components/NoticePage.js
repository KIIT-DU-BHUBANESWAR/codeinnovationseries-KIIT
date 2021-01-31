import React from 'react';
import $ from 'jquery';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Title from './Title';
import Footer from './Footer';
import AllNoticeList from './AllNoticeList';

const NoticePage = () => {
  // Sticky Menu

  return (
    <React.Fragment>
      <header className='sticky-top header'>
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar notice='active'></Navbar>
      </header>
      {/* <!-- /header --> */}
      <Title
        title='Notice'
        body='Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others.'
      ></Title>

      <AllNoticeList></AllNoticeList>

      <Footer></Footer>
    </React.Fragment>
  );
};

export default NoticePage;
