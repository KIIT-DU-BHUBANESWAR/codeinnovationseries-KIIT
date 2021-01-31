import React from 'react';

const Eitem = (props) =>{
    return(
        <React.Fragment>
              <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
    <div className="card border-0 rounded-0 hover-shadow">
      <div className="card-img position-relative">
        <img className="card-img-top rounded-0" src={props.image} alt="event thumb"></img>
        <div className="card-date"><span>{props.date}</span><br></br>{props.month}</div>
      </div>
      <div className="card-body">
        <p><i className="ti-location-pin text-primary mr-2"></i>{props.location}</p>
        <a href="event-single.html"><h4 className="card-title">{props.des}</h4></a>
      </div>
    </div>
  </div>
        </React.Fragment>
    )
}

export default Eitem;