import React from "react";
import bg from "../images/backgrounds/page-title.jpg";

const ClassroomTitle = (props) => {
  var sectionStyle = {
    width: "100%",
    height: "30vmax",
    backgroundImage: `url(${bg})`,
  };
  return (
    <React.Fragment>
      <section className="page-title-section overlay" style={sectionStyle}>
        <div className="container1">
          <div className="row">
            <div className="col-md-8">
              <ul className="list-inline custom-breadcrumb">
                <li className="list-inline-item">
                  <span
                    className="h2 text-primary font-secondary"
                    style={{ fontSize: "9vmin" }}
                  >
                    {props.title}
                  </span>
                </li>
                <li className="list-inline-item text-white h3 font-secondary @@nasted"></li>
              </ul>
              <p className="text-lighten">{props.body}</p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ClassroomTitle;
