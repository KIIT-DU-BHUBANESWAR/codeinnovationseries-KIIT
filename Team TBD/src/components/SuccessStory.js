import React from 'react';
import Success_pic from '../images/backgrounds/success-story.jpg';
import StudyIllustration from '../images/studyng.svg';

const SuccessStory = () => {
  var sectionStyle = {
    width: '100%',
    // height: "77.778vmin",
    // backgroundImage: `url(${Success_pic})`,
  };
  return (
    <React.Fragment>
      <section className='section bg-cover bg-light' style={sectionStyle}>
        <div className='container1'>
          <div className='row align-items-center'>
            <div className='col-lg-6  col-10 mx-auto position-relative success-video'>
              <img src={StudyIllustration} alt='..' width='100%' />
            </div>

            <div className='col-lg-6  col-12'>
              <div
                className=' p-5'
                // style={{
                //   overflowY: "scroll",
                //   height: "60vmin",
                //   width: "30vw",
                // }}
              >
                <h2 className='section-title'>Success Stories</h2>

                <p>
                  After setting a new benchmark for success we planned to expand
                  our support to a wide range of students to create excellence
                  in the domain of education in a systematic manner but in a
                  cost effective way.
                </p>
                <p>
                  At “Effervescence” we partner with the best faculties in the
                  domain to create top quality content for the aspirants. The
                  content is designed using our experience and feedback from
                  successful students, so that it ensures learning is fun and
                  engaging.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SuccessStory;
