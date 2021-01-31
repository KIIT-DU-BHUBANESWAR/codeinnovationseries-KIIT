import React from 'react';

const BannerItem = (props) => {
  return (
    <React.Fragment>
      <div className="col-sm-12 col-lg-4 col-md-6 px-4 pb-lg-3 pb-4 text-center ">
        <div className="banner-card">
          <i className={`${props.iname} mb-xl-4 mb-lg-3 mb-4 feature-icon`}></i>
          <h4 className=" mb-xl-4 mb-lg-3 mb-4 ">{props.heading}</h4>
          <hr className="banner-hr" />
          <p className="text-justify " style={{ textAlignLast: 'center' }}>
            {props.body}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BannerItem;
