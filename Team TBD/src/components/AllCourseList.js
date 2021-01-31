import React, { useState, useEffect } from 'react';
import CourseItem from './CourseItem';
import course_pic1 from '../images/courses/physics2.png';
import course_pic2 from '../images/courses/chemistry3.png';
import course_pic3 from '../images/courses/maths.png';
import { toast } from 'react-toastify';
import {
  isAuthenticated,
  addItemToCart,
  loadCart,
  getAllSubjects,
} from './helper';
import Reading from '../images/svg/reading.svg';

const AllCourseList = () => {
  const [product, setproduct] = useState();
  const [sub, setsub] = useState();
  const update = () => {
    if (!loadCart()) {
      setproduct({ p: 0, c: 0, m: 0, b: 0 });
    } else {
      setproduct(loadCart());
    }
  };
  const [subject, setsubject] = useState([]);
  const [errorF, seterrorF] = useState(false);

  const loadAllSubjects = () => {
    getAllSubjects().then((data) => {
      //   console.log(data)
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          seterrorF(data.error);
        } else {
          setsubject(data);
        }
    });
  };
  useEffect(() => {
    loadAllSubjects();
  }, []);

  return (
    <React.Fragment>
      <section className='section pt-0'>
        <div className='container1'>
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-12'>
              <div className='row d-flex align-items-center justify-content-center mx-0 py-4'>
                <div className='col-md-6 align-self text-center'>
                  <img src={Reading} alt='' className='img-fluid' />
                </div>
                <div className='col-md-6  align-self text-center px-3'>
                  <p className='h2 text-center text-muted'>
                    Find the best course that suits you!
                  </p>
                </div>
              </div>
            </div>
            {subject?.length > 0 &&
              subject.map((obj, i) => {
                return (
                  <CourseItem
                    key={i}
                    subjectid={obj._id}
                    product={product}
                    price={obj.price}
                    standard={obj.standard}
                    topic={obj.name}
                    des=' Lorem ipsum dolor sit amet, consectetur adipisicing elit'
                  ></CourseItem>
                );
              })}
            {!subject && subject.length === 0 && (
              <div className='col-12'>
                <div className='container p-0'>
                  <div className='row py-5 d-flex text-center'>
                    <div className='col-12 align-self'>
                      <p className='display-4'>
                        <div
                          style={{
                            animation: 'linear infinite 2s animateNotice',
                          }}
                        >
                          {' '}
                          No notice for now!
                        </div>
                        Please come back soon...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AllCourseList;
