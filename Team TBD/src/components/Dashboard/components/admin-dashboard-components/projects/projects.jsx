import React, { useState } from 'react';

import img1 from '../../../assets/images/users/1.jpg';

import {
  createClasses,
  isAuthenticated,
  getAllClasses,
  deleteClass,
  updateClass,
  getAClass,
  getASubject,
} from '../../../../helper/index';
import { toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from 'reactstrap';
import { useEffect } from 'react';

const Projects = () => {
  const [classO, setclassO] = useState([]);
  const [, seterrorF] = useState(false);
  const [update, setupdate] = useState(false);
  const [uid, setuid] = useState('');
  const getClassName = (cid) => {
    getASubject(cid)
      .then((data) => data.name)
      .catch((err) => console.log(err));
  };

  const loadAllclasses = () => {
    getAllClasses().then((data) => {
      if (data)
        if (data.error) {
          // toast(data.error, { type: 'error' });
          seterrorF(data.error);
        } else {
          setclassO(data);
        }
    });
  };

  useEffect(() => {
    loadAllclasses();
  }, []);
  const successMessage = () => (
    <div className='row '>
      <div className='col-md-6 offset-sm-3 text-left'>
        <div
          className='alert alert-success'
          style={{ display: success ? '' : 'none' }}
        >
          Congratulations!!! Class is added.
        </div>
      </div>
    </div>
  );

  const errorMessage = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  // const {dispatch} = useContext(TodoContext)
  const { user } = isAuthenticated();

  const nameT = user.name;
  const emailT = user.email;
  const [project, setProject] = useState({
    classLink: '',
    name: nameT,
    email: emailT,
    subject: '',
    Class: '',
    standard: '',
    time: '',
    date: '',
    error: '',
    success: false,
  });
  const {
    classLink,
    name,
    email,
    subject,
    standard,
    time,
    date,
    success,
    error,
  } = project;

  const handleChange = (name) => (event) => {
    setProject({
      ...project,
      error: false,
      [name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });

    createClasses({ classLink, name, email, subject, standard, time, date },subject)
      .then((data) => {
        if (data)
          if (data.error) {
            toast(data.error, { type: 'error' });
            setProject({
              ...project,

              success: false,
            });
          } else {
            setProject({
              ...project,
              classLink: '',
              subject: '',
              Class: '',
              standard: '',
              time: '',
              date: '',
              error: '',
            });
            toast('Classes added', { type: 'success' });
            setrefresh(!refresh);
          }
      })
      .catch(console.log('Error in classes'));
  };
  const deleteaClass = (catuctId) => {
    deleteClass(catuctId).then((data) => {
      console.log(data);
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setrefresh(!refresh);
        }
    });
  };

  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    loadAllclasses();
  }, [refresh]);
  const dashboard = () => (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/

    <Card>
      <CardBody>
        <div className='d-flex align-items-center'>
          <div>
            <CardTitle>Add Classes</CardTitle>
            <CardSubtitle>Click on them to join</CardSubtitle>
          </div>
        </div>
        {successMessage()}
        {errorMessage()}
        <Table className='no-wrap v-middle' responsive>
          <thead>
            <tr className='border-0'>
              <th className='border-0'>Class</th>
              <th className='border-0'>Subject/Standard</th>
              <th className='border-0'>Time</th>
              <th className='border-0'>date</th>
            </tr>
          </thead>
          <tbody>
            {classO.length === 0 && <h3> No Classes Found </h3>}
            {classO.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div className='d-flex no-block align-items-center'>
                      <div className='mr-2'>
                        <img
                          src={img1}
                          alt='user'
                          className='rounded-circle'
                          width='45'
                        />
                      </div>
                      <div className=''>
                        <h5 className='mb-0 font-16 font-medium'>{obj.name}</h5>
                        <span>{obj.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{obj.subject.name}({obj.subject.standard})</td>
                  <td>{obj.time}</td>
                  <td className='blue-grey-text  text-darken-4 font-medium'>
                    {obj.date.substring(8, 10)}
                    {obj.date.substring(4, 7)}-{obj.date.substring(0, 4)}
                  </td>
                  <td>
                   
                    <i
                      class='fa fa-trash text-orange'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        deleteaClass(obj._id);
                      }}
                      aria-hidden='true'
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
  return <React.Fragment>{dashboard()}</React.Fragment>;
};

export default Projects;
