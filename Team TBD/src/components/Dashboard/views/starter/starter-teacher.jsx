/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  classrooms,
  getAllStandards,
  getAllClassrooms,
  getAClassroom,
  updateClassroom,
  deleteClassroom,
  isAuthenticated,
  getAUser,
  getAllSubjects,
} from '../../../helper/index';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Input,
  Table,
} from 'reactstrap';

import { useRef } from 'react';
// import AddDocument from '../ui-components/document'
import AddDQuiz from '../ui-components/crud/quiz';
import { toast } from 'react-toastify';
import ClassLink from '../ui-components/crud/classlinkCRUD';
const Starter = () => {
  const [file, setfile] = useState();
  const [video, setvideo] = useState('');
  const [classroomO, setclassroomO] = useState([]);
  const [update, setupdate] = useState(false);
  const [uid, setuid] = useState('');
  const [errorF, seterrorF] = useState(false);
  const [values, setvalues] = useState({
    formData: '',
    hello: '',
  });
  const [std, setstandard] = useState([]);
  const [errorS, seterrorS] = useState(false);

  const [refresh, setrefresh] = useState(true);

  const { formData } = values;

  const [sub, setsubject] = useState([]);
  const [role, setrole] = useState(1);

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

  const loadAllStandards = () => {
    getAllStandards().then((data) => {
      //   console.log(data)
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          seterrorS(data.error);
        } else {
          setstandard(data);
        }
    });
  };
  useEffect(() => {
    loadAllStandards();
  }, []);

  const loadAllclassroooms = () => {
    getAllClassrooms().then((data) => {
      console.log(data);
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          seterrorF(data.error);
        } else {
          setclassroomO(data);
        }
    });
  };
  useEffect(() => {
    loadAllclassroooms();
  }, []);

  const successMessage = () => (
    <div className='row '>
      <div className='col-md-6 offset-sm-3 text-left'>
        <div
          className='alert alert-success'
          style={{ display: success ? '' : 'none' }}
        >
          Congratulations!!! Classroom is added.
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

  const { user, token } = isAuthenticated();
  const Tid = user._id;

  const [project, setProject] = useState({
    name: '',
    description: '',
    subject: '',
    owner: user._id,
    standard: 0,
    error: '',
    success: false,
  });

  const {
    name,
    description,
    subject,
    owner,
    standard,
    success,
    error,
  } = project;

  const handleChange = (name) => (event) => {
    // const v = name === "formData"? event.target.files[0]:event.target.value

    // formData.set(name,v)
    setProject({
      ...project,
      error: false,
      [name]: event.target.value,
    });
  };

  const onclassroomSubmit = (event) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });

    classrooms({ name, description, subject, owner, standard })
      .then((data) => {
        console.log(data);
        console.log(project);
        if (data.error) {
          toast(data.error, { type: 'error' });
          setProject({
            ...project,

            success: false,
          });
        } else {
          setProject({
            ...project,
            name: '',
            description: '',
            subject: '',
            owner: user._id,
            standard: 0,
            error: '',
          });
          toast('Classroom Added', { type: 'success' });
          setrefresh(!refresh);
        }
      })
      .catch(console.log('Error in Classrooms'));
  };
  const deleteaClassroom = (catuctId) => {
    deleteClassroom(catuctId).then((data) => {
      console.log(data);
      if (data.error) {
        toast(data.error, { type: 'error' });
        console.log(data.error);
        // setValues({...values,error:data.error})
      } else {
        setrefresh(!refresh);
      }
    });
  };
  const getClassroom = (catuctId) => {
    getAClassroom(catuctId).then((data) => {
      if (data.error) {
        toast(data.error, { type: 'error' });
        console.log(data.error);
        // setValues({...values,error:data.error})
      } else {
        setProject({
          ...project,
          name: data.name,
          description: data.description,
          subject: data.subject,
          standard: data.standard,
        });
        setuid(data._id);
        setupdate(true);
        setrefresh(!refresh);
      }
    });
  };
  const updateaClassroom = (event, cid) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });
    updateClassroom(cid, { name, description, subject, standard }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setProject({
            ...project,
            name: '',
            description: '',
            subject: '',
            standard: 0,
            error: '',
          });
          toast('Classroom Updated', { type: 'success' });
          setrefresh(!refresh);
          setupdate(false);
        }
      }
    );
  };
  useEffect(() => {
    loadAllclassroooms();
  }, [refresh]);
  const handleChange2 = (name) => (event) => {
    const v = name === 'formData' ? event.target.files[0] : event.target.value;

    formData.set(name, v);
    setvalues({ ...values, [name]: v });
  };
  const [file2, setfile2] = useState([]);
  return (
    <div className='mt-4'>
      {/* <Row>
                <Col sm={6} lg={8}>
                    <SalesSummary />
                </Col>
                <Col sm={6} lg={4}>
                    <Feeds />
                </Col>
            </Row> */}
      <Row className='align-items-center'>
        <Col>
          <ClassLink />
          {/* <Projects /> */}
        </Col>
      </Row>

      <Row>
        <Card className='card-teacher'>
          <CardBody>
            <div className='d-flex align-items-center'>
              <div>
                <CardTitle>Add Classroom</CardTitle>
                <CardSubtitle>
                  Enter Name Description and choose Subject, Standard
                </CardSubtitle>
              </div>
            </div>
            {successMessage()}
            {errorMessage()}
            <Table className='no-wrap v-middle' responsive>
              <thead>
                <tr className='border-0'>
                  <th className='border-0'>Name</th>
                  <th className='border-0'>Description</th>
                  <th className='border-0'>Subject/Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className='d-flex no-block align-items-center'>
                      <div className=''>
                        <Input
                          type='text'
                          name={name}
                          id={name}
                          placeholder='Name'
                          value={name}
                          onChange={handleChange('name')}
                        ></Input>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex no-block align-items-center'>
                      <div className=''>
                        <Input
                          type='text'
                          name={description}
                          id={description}
                          placeholder='Description'
                          value={description}
                          onChange={handleChange('description')}
                        ></Input>
                      </div>
                    </div>
                  </td>

                  <td>
                    <Input
                      type='select'
                      className='custom-select'
                      value={subject}
                      onChange={handleChange('subject')}
                    >
                      <option value='0'>Select</option>
                      {sub.map((obj, i) => {
                        return (
                          <option key={i} value={obj._id}>
                            {obj.name}({obj.standard})
                          </option>
                        );
                      })}
                    </Input>
                  </td>

                  <td>
                    {update === true ? (
                      <i
                        onClick={(e) => {
                          updateaClassroom(e, uid);
                        }}
                        style={{
                          cursor: 'pointer',
                          marginTop: '6px',
                          fontSize: '20px',
                        }}
                        className='fa fa-check text-success'
                        aria-hidden='true'
                      ></i>
                    ) : (
                      <i
                        onClick={onclassroomSubmit}
                        style={{
                          cursor: 'pointer',
                          marginTop: '6px',
                          fontSize: '20px',
                        }}
                        className='fa fa-plus text-success'
                        aria-hidden='true'
                      ></i>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            {classroomO.length === 0 && (
              <h3 className='text-center'>No Classroom Found</h3>
            )}
          </CardBody>
        </Card>
      </Row>
      {/* <Row>
        {classroomO.map((obj, i) => {
          if (Tid.toString() === obj.owner._id.toString()) {
            return (
              // <tr key={i}>
              <Col xs="12" md="4" key={i}>
                <Card
                  style={{
                    borderRadius: "10px 10px 10px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      height: "5rem",
                      background: "linear-gradient(45deg, #1273BE, violet)",
                      borderRadius: "10px 10px 0 0",
                    }}
                  ></div>
                  <CardTitle>{obj.name}</CardTitle>
                  <CardSubtitle>{obj.subject.name}</CardSubtitle>
                  <CardSubtitle>{obj.subject.standard}</CardSubtitle>
                  <CardBody>{obj.description}</CardBody>
                  <div>
                    {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                      <p>
                        <Link to={`/teacherClassroom/${obj._id}`}>
                          See More
                        </Link>
                      </p>
                    ) : (
                      ""
                    )}
                    <i
                      className="fa fa-plus text-info"
                      style={{ cursor: "pointer", marginRight: "20px" }}
                      onClick={() => {
                        getClassroom(obj._id);
                      }}
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-trash text-orange"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteaClassroom(obj._id);
                      }}
                      aria-hidden="true"
                    ></i>
                  </div>
                </Card>
              </Col>
            );
          }
        })}
      </Row> */}

      <Row>
        <Col xs='12' md='12'>
          <AddDQuiz></AddDQuiz>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
