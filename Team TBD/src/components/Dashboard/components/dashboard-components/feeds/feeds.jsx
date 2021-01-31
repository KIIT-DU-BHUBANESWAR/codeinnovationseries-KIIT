import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import {
  getAllNotices,
  getAUser,
  isAuthenticated,
  subclasses,
  subquizzes,
} from '../../../../helper/index';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Feeds = () => {
  const { user, token } = isAuthenticated();
  const [notice, setNotice] = useState(0);
  const [classes, setClasses] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const loadAllNotice = () => {
    getAllNotices()
      .then((data) => {
        if (data) {
          setNotice(data.length);
        } else {
          console.log('no notice');
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(loadAllNotice);
  const [userSubject, setuserSubject] = useState([]);
  const loaduser = () => {
    getAUser(user._id, token).then((data) => {
      if (data) {
        if (data.error) {
          toast(data.error, { type: 'error' });
        } else {
          console.log(data.subject, 'userrrrrrrrr');
          setuserSubject(data.subject);
        }
      }
    });
  };
  useEffect(() => {
    loaduser();
  }, []);
  const loadAllClass = () => {
    subclasses({ user_id: user._id })
      .then((data) => {
        if (data) {
          setClasses(data.length);
        } else {
          console.log('no class');
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(loadAllClass);

  const loadAllQuiz = () => {
    subquizzes({ user_id: user._id })
      .then((data) => {
        if (data) {
          setQuiz(data.length);
        } else {
          console.log('No Quiz');
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(loadAllQuiz);

  return (
    <Card style={{ maxHeight: '60vh', height: '100%', overflowY: 'scroll' }}>
      <CardBody>
        <CardTitle>Feeds</CardTitle>
        <div className='feed-widget'>
          <ul className='list-style-none feed-body m-0 pb-3'>
            {/* <li className="feed-item">
                            <div className="ml-4 font-14">{userSubject.map((sub,i)=>{
                                return(
                                    <>
                                        <div><span>{i+1}.</span>{sub.name}<span className="text-muted font-8">(expiresOn:{sub.expiresOn.substring(0,10)})</span></div>
                                    </>
                                )
                            })}</div>
                        </li> */}
            {/* <li className="feed-item">
                            <div className="feed-icon bg-info"><i className="far fa-bell"></i></div> You have {notice} notices. <span className="ml-auto font-12 text-muted"></span>
                        </li> */}
            <li className='feed-item'>
              <div className='feed-icon bg-success'>
                <i className='ti-server'></i>
              </div>{' '}
              Class: {classes}
              <span className='ml-auto font-12 text-muted'></span>
              <div className='feed-icon bg-danger'>
                <i className='ti-user'></i>
              </div>{' '}
              Quiz: {quiz}
              <span className='ml-auto font-12 text-muted'></span>
            </li>
            <li className='feed-item feed-table'>
              <Table>
                <thead>
                  <th>Your subjects:</th>
                  <th>Expires On:</th>
                </thead>
                <tbody>
                  {userSubject.map((sub, i) => {
                    return (
                      <tr>
                        <td>{sub.name}</td>
                        <td>
                          <span className='ml-auto text-muted font-8'>
                            {sub.expiresOn.substring(0, 10)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {/* <div>Your subjects:</div> */}
            </li>
            {/* <li className="feed-item">
                            <div className="feed-icon bg-warning"><i className="ti-shopping-cart"></i></div> New order received.<span className="ml-auto font-12 text-muted">31 May</span>
                        </li> */}
            {/* <li className="feed-item">
                            <div className="feed-icon bg-danger"><i className="ti-user"></i></div> Quiz: {quiz}<span className="ml-auto font-12 text-muted"></span>
                        </li> */}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
