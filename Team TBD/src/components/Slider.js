import React from 'react';
import '../plugins/bootstrap/bootstrap.min.css';
import '../plugins/slick/slick.css';
import '../plugins/themify-icons/themify-icons.css';
import '../plugins/animate/animate.css';
import '../plugins/aos/aos.css';
import '../plugins/venobox/venobox.css';
import '../css/style.css';
import Slider from 'react-slick';
import 'slick';
// eslint-disable-next-line no-unused-vars
import preloader from '../images/preloader.gif';
import Slide from './Slide';
import bg from '../images/banner/tutor.jpeg';
const SliderList = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
    initialSlide: 0,
  };

  return (
    <React.Fragment>
      <section className="hero-section overlay bg-cover bannerStyle1">
        <div className="" style={{ width: '80vw', margin: 'auto' }}>
          <div className="hero-slider">
            <Slider {...settings}>
              <Slide heading="Empowering children to reach their potential!"></Slide>

              <Slide heading="Your bright future is our mission!"></Slide>
              <Slide heading="You can count on us."></Slide>
            </Slider>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SliderList;
