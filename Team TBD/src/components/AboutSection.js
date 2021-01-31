import React from "react";
import aboutimage from "../images/about/about4.jpg";

const AboutSection = () => {
  return (
    <React.Fragment>
      <section className="section">
        <div className="container1">
          <div className="row">
            <div className="col-12">
              <img
                className="img-fluid w-100 mb-4"
                src={aboutimage}
                style={{ borderRadius: "10px" }}
                alt="about"
              ></img>
              <h2 className="section-title">ABOUT OUR JOURNEY</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et.dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Saepe ipsa illo quod veritatis,
                magni debitis fugiat dolore voluptates! Consequatur, aliquid.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat perferendis sint optio similique. Et amet magni facilis
                vero corporis quos.
              </p>
              <p>
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Ipsum a, facere
                fugit error accusamus est officiis vero in, nostrum laboriosam
                corrupti explicabo, cumque repudiandae deleniti perspiciatis
                quae consectetur enim. Laboriosam!
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutSection;
