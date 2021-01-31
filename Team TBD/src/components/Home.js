/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React from 'react';
import $ from 'jquery';
import '../plugins/bootstrap/bootstrap.min.css';
import '../plugins/slick/slick.css';
import '../plugins/themify-icons/themify-icons.css';
import '../plugins/animate/animate.css';
import '../plugins/aos/aos.css';
import '../plugins/venobox/venobox.css';
import '../css/style.css';
import preloader from '../images/preloader.gif';
import logo from '../images/logo.png';
import TopHeader from './TopHeader.js';
import Navbar from './Navbar.js';
import ResgisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import SliderList from './Slider';
import Banner from './Banner';
import AboutUs from './AboutUs';
import Courses from './Courses';
import Cta from './Cta';
import SuccessStory from './SuccessStory';
import TeacherList from './TeacherList';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';

const Home = () => {
  // Sticky Menu

  // filter
  $(document).ready(function () {
    var containerEl = document.querySelector('.filtr-container');
    var filterizd;
    if (containerEl) {
      filterizd = $('.filtr-container').filterizr({});
    }
    //Active changer
    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
  });

  $(window).on('load', function () {
    $('.preloader').fadeOut(700);
  });

  return (
    <React.Fragment>
      {/* <!-- preloader start --> */}
      {/* <div className="preloader">
              <img src={preloader} alt="preloader"></img>
            </div> */}
      {/* <!-- preloader end --> */}

      <header className='sticky-top header'>
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar home='active'></Navbar>
      </header>
      {/* <!-- /header --> */}

      <SliderList></SliderList>

      <Banner></Banner>

      <AboutUs topic='Educenter' />

      {/* <Courses></Courses> */}

      {/* <Cta></Cta> */}

      <SuccessStory />

      {/* <Events></Events> */}

      {/* <TeacherList></TeacherList> */}

      <Footer></Footer>
    </React.Fragment>
  );
};
export default withRouter(Home);
