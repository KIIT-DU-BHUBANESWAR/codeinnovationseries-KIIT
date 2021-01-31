import React from 'react';
import About_pic from '../images/about/about3.jpg';
import { Link } from 'react-router-dom';

const AboutUs = (props) => {
  return (
    <React.Fragment>
      <section className="section">
        <div className="" style={{ width: '80vw', margin: 'auto' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-md-1">
              <h2 className="section-title">About {props.topic}</h2>
              <p>
                “Effervescence” is not just a brand name. The name itself is
                self-explanatory. As talents or ideas are bubbling inside a
                student, longing for the opportunity to surface and emerge with
                full vigour when they get the escape velocity; we motivate the
                students to effervesce their potentials just as an effervescent
                liquid raises bubbles so that our aspirants can reach their goal
                with full confidence.
              </p>
              <p>
                We are going to start our journey from the small town of
                Coochbehar, but with a ‘not so small’ dream. The dream has
                already turned into a reality without any brand name. For last
                10 years we have had a large number of successful aspirants in
                competitive exams like JEE (Mains and Advance), NEET-UG, WBJEE,
                KVPY as well as in class XII Board exam (WBCHSE, CBSE, ICSE)
                (Please, see the list of a few successful candidates).{' '}
              </p>
              <Link to="/about" className="btn btn-primary-outline">
                Learn more
              </Link>
            </div>
            <div className="col-lg-6 order-1 order-md-2 mb-4 mb-md-0">
              <img
                className="img-fluid image-hover-shadow w-100"
                src={About_pic}
                alt="aboutimage"
                style={{ borderRadius: '10px' }}
              ></img>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
