/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  notices,
  isAuthenticated,
  getAllNotices,
  deleteNotice,
  updateNotice,
  getANotice,
  getAllUSers,
  updateRole,
  addSubcriber,
  sendMail,
} from '../../../helper/index';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Input,
  Table,
} from 'reactstrap';
import Search from '../ui-components/findUser';
import Expired from '../ui-components/expiredUser';
import {
  SalesSummary,
  Projects,
  Feeds,
} from '../../components/admin-dashboard-components';
import Subject from '../ui-components/crud/SubjectCRUD';
import Standard from '../ui-components/crud/StandardCRUD';
import ClassLink from '../ui-components/crud/classlinkCRUD'
import $ from 'jquery';

import img1 from '../../assets/images/big/img1.jpg';
import img2 from '../../assets/images/big/img2.jpg';
import img3 from '../../assets/images/big/img3.jpg';
import { toast } from 'react-toastify';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import { convertToRaw } from 'draft-js';

const Starter = () => {
  $(document).ready(() => {
    $('.sl').addClass('hide');
  });
  $('.bsm').click(() => {
    $('.sm').addClass('hide');
    $('.sl').removeClass('hide');
  });
  $('.bsl').click(() => {
    $('.sl').addClass('hide');
    $('.sm').removeClass('hide');
  });

  $(document).ready(() => {
    $('.wsl').addClass('hide');
  });
  $('.bwsm').click(() => {
    $('.wsm').addClass('hide');
    $('.wsl').removeClass('hide');
  });
  $('.bwsl').click(() => {
    $('.wsl').addClass('hide');
    $('.wsm').removeClass('hide');
  });

  $(document).ready(() => {
    $('.msl').addClass('hide');
  });
  $('.bmsm').click(() => {
    $('.msm').addClass('hide');
    $('.msl').removeClass('hide');
  });
  $('.bmsl').click(() => {
    $('.msl').addClass('hide');
    $('.msm').removeClass('hide');
  });

  const [file, setfile] = useState('choose');
  const [video, setvideo] = useState('');
  const [emailT, setemailT] = useState('');
  const [emailA, setemailA] = useState('');

  const [noticeO, setnoticeO] = useState([]);
  const [userO, setuserO] = useState([]);
  var students = 0;
  var studentsarray = [];
  var weekstudents = 0;
  var weekstudentsarray = [];
  var monthstudents = 0;
  var monthstudentsarray = [];
  var difference = 0;
  var usercreation = '';
  const [errorF, seterrorF] = useState(false);
  const [errorU, seterrorU] = useState(false);
  const [update, setupdate] = useState(false);
  const [uid, setuid] = useState('');
  const [Email, setEmail] = useState({
    subject: '',
    bodyMsg: '',
    imgUrl: '',
  });
  const [editorState, setEditorState] = React.useState('');

  const handleEmail = (name) => (event) => {
    setEmail({
      ...Email,
      [name]: event.target.value,
    });
  };
  const { bodyMsg, subject, imgUrl } = Email;

  const pushEmailsForSubscribers = (e) => {
    e.preventDefault();

    let { bodyMsg, subject, imgUrl } = Email;
    bodyMsg = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    sendMail({ bodyMsg, subject, imgUrl })
      .then((data) => {
        setEmail({ subject: '', bodyMsg: '', imgUrl: '' });
        setEditorState('');
        return toast('Mail Sent', { type: 'success' });
      })
      .catch((error) => {
        console.log(error);
        return toast('Cannot send mail', { type: 'error' });
      });
  };

  const loadAllnotices = () => {
    getAllNotices().then((data) => {
      console.log(data);
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          seterrorF(data.error);
        } else {
          setnoticeO(data);
        }
    });
  };
  const loadAllusers = () => {
    getAllUSers().then((data) => {
      console.log(data);
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          seterrorF(data.error);
        } else {
          setuserO(data);
        }
    });
  };

  useEffect(() => {
    loadAllnotices();
  }, []);
  useEffect(() => {
    loadAllusers();
  }, []);
  const successMessage = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}
          >
            Congratulations!!! Notice is added.
          </div>
        </div>
      </div>
    );
  };

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
  const [successT, setsuccessT] = useState(false);
  const [errorT, seterrorT] = useState(false);
  const [successA, setsuccessA] = useState(false);
  const [errorA, seterrorA] = useState(false);
  const successTeacher = () => (
    <div className='row '>
      <div className='col-md-6 offset-sm-3 text-left'>
        <div
          className='alert alert-success'
          style={{ display: successT ? '' : 'none' }}
        >
          Teacher Added!!
        </div>
      </div>
    </div>
  );

  const errorTeacher = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: errorT ? '' : 'none' }}
          >
            {errorT}
          </div>
        </div>
      </div>
    );
  };

  const successAdmin = () => (
    <div className='row '>
      <div className='col-md-6 offset-sm-3 text-left'>
        <div
          className='alert alert-success'
          style={{ display: successA ? '' : 'none' }}
        >
          Admin Added!!
        </div>
      </div>
    </div>
  );

  const errorAdmin = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: errorA ? '' : 'none' }}
          >
            {errorA}
          </div>
        </div>
      </div>
    );
  };
  // const {dispatch} = useContext(TodoContext)
  const { user } = isAuthenticated();
  const [project, setProject] = useState({
    title: '',
    description: '',
    date: '',
    error: '',
    success: false,
  });
  const { title, description, date, success, error } = project;

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

    notices({ title, description, date })
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
              title: '',
              description: '',
              date: '',
              error: '',
            });
            toast('Notice Added', { type: 'success' });
            setrefresh(!refresh);
          }
      })
      .catch(console.log('Error in Noticees'));
  };
  const deleteaNotice = (catuctId) => {
    deleteNotice(catuctId).then((data) => {
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
  const getNotice = (noticeId) => {
    getANotice(noticeId).then((data) => {
      console.log(data.date, 'd');
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setProject({
            ...project,
            title: data.title,
            description: data.description,
            date: data.date,
          });
          setuid(data._id);
          setupdate(true);
          setrefresh(!refresh);
        }
    });
  };
  const updateaNotice = (event, nid) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });
    updateNotice(nid, { title, description, date }).then((data) => {
      console.log(data);
      if (data)
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setProject({
            ...project,
            title: '',
            description: '',
            date: '',
            error: '',
          });
          toast('Notice Updated', { type: 'success' });
          setrefresh(!refresh);
          setupdate(false);
        }
    });
  };

  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    loadAllnotices();
  }, [refresh]);
  useEffect(() => {
    loadAllusers();
  }, [refresh]);

  const addTeacher = () => {
    updateRole(user._id, { email: emailT, role: 1 }).then((data) => {
      if (data) {
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error, 'lllllllllllll');
          // setValues({...values,error:data.error})
          seterrorT(data.error);
        } else {
          setemailT('');
          setsuccessT(true);
        }
      }
    });
  };
  const addAdmin = () => {
    updateRole(user._id, { email: emailA, role: 2 }).then((data) => {
      if (data) {
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error, 'lllllllllllll');
          seterrorA(data.error);
          // setValues({...values,error:data.error})
        } else {
          setemailA('');
          setsuccessA(true);
        }
      }
    });
  };
  return (
    <div>
      <Row className='text-center'>
        {userO.map((obj, i) => {
          if (obj.role === 0) {
            students = students + 1;
            studentsarray[students - 1] = obj;
            usercreation = `${obj.createdAt.substring(
              5,
              7
            )}/${obj.createdAt.substring(8, 10)}/${obj.createdAt.substring(
              0,
              4
            )}`;
            difference = Math.floor(
              (new Date().getTime() - new Date(usercreation).getTime()) /
                (1000 * 3600 * 24)
            );

            if (difference <= 7) {
              weekstudents = weekstudents + 1;
              weekstudentsarray[weekstudents - 1] = obj;
            }
            if (difference <= 30) {
              monthstudents = monthstudents + 1;
              monthstudentsarray[monthstudents - 1] = obj;
            }
            if (students === 0) {
              $('.bsm').addClass('hide');
            } else {
              $('.bsm').removeClass('hide');
            }
            if (weekstudents === 0) {
              $('.bwsm').addClass('hide');
            } else {
              $('.bwsm').removeClass('hide');
            }
            if (monthstudents === 0) {
              $('.bmsm').addClass('hide');
            } else {
              $('.bmsm').removeClass('hide');
            }
          }
        })}
        <Col xs='12' md='4'>
          {/*--------------------------------------------------------------------------------*/}
          {/*Card-1*/}
          {/*--------------------------------------------------------------------------------*/}
          <Card
            style={{
              borderRadius: '10px',
              backgroundColor: 'cornflowerblue',
              color: 'white',
              minHeight: '8rem',
            }}
          >
            {/* <CardImg top width="100%" src={img2} /> */}
            <CardBody>
              <CardTitle>Total Registered</CardTitle>

              <h4>{students}</h4>
            </CardBody>
          </Card>
        </Col>
        <Col xs='12' md='4'>
          <Card
            style={{
              borderRadius: '10px',
              backgroundColor: 'red',
              color: 'white',
              minHeight: '8rem',
            }}
          >
            {/* <CardImg top width="100%" src={img2} /> */}
            <CardBody>
              <CardTitle>Registered in last 1 week</CardTitle>

              <h4>{weekstudents}</h4>
            </CardBody>
          </Card>
        </Col>
        <Col xs='12' md='4'>
          <Card
            style={{
              borderRadius: '10px',
              backgroundColor: 'green',
              color: 'white',
              minHeight: '8rem',
            }}
          >
            {/* <CardImg top width="100%" src={img2} /> */}
            <CardBody>
              <CardTitle>Registered in last 30 days</CardTitle>

              <h4>{monthstudents}</h4>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Row>
            <Col sm={6} lg={8}>
                <SalesSummary />
            </Col>
            <Col sm={6} lg={4}>
                <Feeds />
            </Col>
        </Row> */}
      <Row>
        <Col sm={12}>
          <Projects />
        </Col>
      </Row>
      <Row>
        <Col xs='12' md='12'>
          <Card>
            <CardBody>
              <CardTitle>News Letter</CardTitle>
              <CardSubtitle>Send Email</CardSubtitle>
              <Input
                type='text'
                name='subject'
                id='subject'
                placeholder='Enter Email Title here..'
                value={subject}
                onChange={handleEmail('subject')}
                style={{ marginTop: '1rem' }}
              />
              <hr />
              <Input
                type='text'
                name='imgUrl'
                id='imgUrl'
                placeholder='Enter Img here..'
                value={imgUrl}
                onChange={handleEmail('imgUrl')}
                style={{ marginTop: '1rem' }}
              />
              <hr />
              <Editor
                editorState={editorState}
                toolbarClassName='toolbarClassName'
                wrapperClassName='wrapper-draft'
                editorClassName='editor-draft'
                onEditorStateChange={setEditorState}
              />
              {/* <Input
                type='textarea'
                name='bodyMsg'
                id='bodyMsg'
                placeholder='Enter Email Body here..'
                value={bodyMsg}
                onChange={handleEmail('bodyMsg')}
                style={{ marginTop: '1rem' }}
              /> */}
              <Button
                onClick={pushEmailsForSubscribers}
                style={{ marginTop: '1rem' }}
              >
                Send
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className='text-center'>
        <Col xs='12' md='6'>
          {/*--------------------------------------------------------------------------------*/}
          {/*Card-1*/}
          {/*--------------------------------------------------------------------------------*/}
          <Card>
            {/* <CardImg top width="100%" src={img1} /> */}
            <CardBody>
              <CardTitle>Add Teacher</CardTitle>
              <CardSubtitle>Provide email of the teacher.</CardSubtitle>
              {successTeacher()}
              {errorTeacher()}
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Enter email here..'
                value={emailT}
                onChange={(e) => setemailT(e.target.value)}
                style={{ marginTop: '1rem' }}
              ></Input>

              <Button
                onClick={() => {
                  addTeacher();
                }}
                style={{ marginTop: '1rem' }}
              >
                Add
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs='12' md='6'>
          {/*--------------------------------------------------------------------------------*/}
          {/*Card-1*/}
          {/*--------------------------------------------------------------------------------*/}
          <Card>
            {/* <CardImg top width="100%" src={img1} /> */}
            <CardBody>
              <CardTitle>Add Admin</CardTitle>
              <CardSubtitle>Provide email of the admin.</CardSubtitle>
              {successAdmin()}
              {errorAdmin()}
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Enter email here..'
                value={emailA}
                onChange={(e) => setemailA(e.target.value)}
                style={{ marginTop: '1rem' }}
              ></Input>

              <Button
                onClick={() => {
                  addAdmin();
                }}
                style={{ marginTop: '1rem' }}
              >
                Add
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className='text-center'>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className='d-flex align-items-center'>
                <div>
                  <CardTitle>Add Notice</CardTitle>
                  <CardSubtitle>Enter Title Description and Date</CardSubtitle>
                </div>
              </div>
              {successMessage()}
              {errorMessage()}
              <Table className='no-wrap v-middle' responsive>
                <thead>
                  <tr className='border-0'>
                    <th className='border-0'>Title</th>
                    <th className='border-0'>Description</th>
                    <th className='border-0'>date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className='d-flex no-block align-items-center'>
                        <div className=''>
                          <Input
                            type='text'
                            name={title}
                            id={title}
                            placeholder='Title'
                            value={title}
                            onChange={handleChange('title')}
                          ></Input>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* <div className="d-flex no-block align-items-center">
                                    <div className=""> */}
                      <Input
                        type='text'
                        name={description}
                        id={description}
                        placeholder='Description'
                        value={description}
                        onChange={handleChange('description')}
                      ></Input>
                      {/*                                      
                                    </div>
                                </div> */}
                    </td>

                    <td className='blue-grey-text  text-darken-4 font-medium'>
                      <Input
                        type='date'
                        name='date'
                        id='date'
                        placeholder='1 hr.'
                        value={date}
                        onChange={handleChange('date')}
                        style={{ maxWidth: '200px' }}
                      ></Input>
                    </td>
                    <td>
                      {update === true ? (
                        <i
                          onClick={(e) => {
                            updateaNotice(e, uid);
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
                          onClick={onSubmit}
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
                  {noticeO.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className='d-flex no-block align-items-center'>
                            {/* <div className="mr-2"><img src={img1} alt="user" className="rounded-circle" width="45" /></div> */}
                            <div className=''>
                              <h5 className='mb-0 font-16 font-medium'>
                                {obj.title}
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td>{obj.description}</td>

                        <td className='blue-grey-text  text-darken-4 font-medium'>
                          {obj.date.substring(8, 10)}
                          {obj.date.substring(4, 7)}-{obj.date.substring(0, 4)}
                        </td>
                        <td>
                          <i
                            class='fa fa-plus text-info'
                            style={{ cursor: 'pointer', marginRight: '20px' }}
                            onClick={() => {
                              getNotice(obj._id);
                            }}
                            aria-hidden='true'
                          ></i>
                          <i
                            class='fa fa-trash text-orange'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              deleteaNotice(obj._id);
                            }}
                            aria-hidden='true'
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {noticeO.length === 0 && (
                <h3 className='text-center'> No Notice to Display. </h3>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Standard></Standard>
      <Subject></Subject>
      <Expired></Expired>
      <Search></Search>
    </div>
  );
};

export default Starter;
