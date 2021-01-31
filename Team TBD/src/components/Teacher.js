import React from 'react';

const Teacher = (props) => {
    var display = {
        display: `inline-block`
      };
    return(
        <React.Fragment>
            <div className="col" style={display}>
            <div className="card border-0 rounded-0 hover-shadow">
            <img className="card-img-top rounded-0" src={props.image} alt="teacher"></img>
            <div className="card-body">
                <a href="teacher-single.html">
                <h4 className="card-title">{props.name}</h4>
                </a>
                <p>{props.subject}</p>
                <ul className="list-inline">
                <li className="list-inline-item"><a className="text-color" href="/"><i className="ti-facebook"></i></a></li>
                <li className="list-inline-item"><a className="text-color" href="/"><i className="ti-twitter-alt"></i></a></li>
                <li className="list-inline-item"><a className="text-color" href="/"><i className="ti-google"></i></a></li>
                <li className="list-inline-item"><a className="text-color" href="/"><i className="ti-linkedin"></i></a></li>
                </ul>
            </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Teacher;