import React from 'react';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <React.Fragment>
      <section className='section-sm'>
        <div className='container1'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex align-items-center section-title justify-content-between'>
                <h2 className='mb-0 text-nowrap mr-3'>Our Course</h2>
                <div className='border-top w-100 border-primary d-none d-sm-block'></div>
                <div>
                  <Link
                    to='/course'
                    className='btn btn-sm btn-primary-outline ml-sm-3 d-none d-sm-block'
                  >
                    see all
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <CourseList></CourseList>
          {/*<!--start mobile see all button -->*/}
          <div className='row'>
            <div className='col-12 text-center'>
              <Link
                to='/course'
                className='btn btn-sm btn-primary-outline d-sm-none d-inline-block'
              >
                see all
              </Link>
            </div>
          </div>
          {/*<!--end mobile see all button -->*/}
        </div>
      </section>
    </React.Fragment>
  );
};
export default Courses;
