import React from 'react';

import bg from '../images/banner/tutor.jpeg';
// import bg from "../images/backgrounds/page-title.jpg";

const Title = (props) => {

  return (
    <React.Fragment>
      <section className='page-title-section overlay bannerStyle1' >
        <div className='row pb-5'>
          <div className='col-lg-8 pb-5 col-sm-10'>
            <ul className='list-inline custom-breadcrumb'>
              <li className='list-inline-item'>
                <h1 className='  text-white'>{props.title}</h1>
              </li>
            </ul>
            <p className="text-lighten">{props.body}</p>
            <hr className="divider ml-0" />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Title;
