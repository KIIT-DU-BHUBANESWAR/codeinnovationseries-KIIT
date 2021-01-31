import React from 'react';

const NoticeItem = (props) => {
    return(
        <React.Fragment>
            <li className="d-md-table mb-4 w-100 border-bottom hover-shadow">
            <div className="d-md-table-cell text-center p-4 bg-primary text-white mb-4 mb-md-0" style={{width: "15rem"}}><span className="h2 d-block">{props.date}</span> {props.month}, {props.year}</div>
            <div className="d-md-table-cell px-4 vertical-align-middle mb-4 mb-md-0">
              <a href="notice-single.html" className="h4 mb-3 d-block">{props.title}</a>
              <p className="mb-0">{props.des}</p>
            </div>
            {/* <div className="d-md-table-cell text-right pr-0 pr-md-4"><a href="notice-single.html" className="btn btn-primary-outline">read more</a></div> */}
            </li>
        </React.Fragment>
    )
}

export default NoticeItem;