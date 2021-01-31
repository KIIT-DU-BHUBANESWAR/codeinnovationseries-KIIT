import React from "react";
import Teacher from "./Teacher";
import teacherpic_1 from "../images/teachers/teacher-1.jpg";
import teacherpic_2 from "../images/teachers/teacher-2.jpg";
import teacherpic_3 from "../images/teachers/teacher-3.jpg";
import Slider from "react-slick";

const TeacherList = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <section className="section">
        <div className="container1">
          <div className="row justify-content-center">
            <div className="col-12">
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />
              <style>{cssstyle}</style>
              <h2 className="section-title">Our Teachers</h2>
              <Slider {...settings}>
                <Teacher
                  name="Jacke Masito"
                  image={teacherpic_1}
                  subject="physics"
                ></Teacher>
                <Teacher
                  name="Klark Malik"
                  image={teacherpic_2}
                  subject="chemistry"
                ></Teacher>
                <Teacher
                  name="John Doe"
                  image={teacherpic_3}
                  subject="Mathematics"
                ></Teacher>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`;

export default TeacherList;
