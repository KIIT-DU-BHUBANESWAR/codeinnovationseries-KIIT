import React, { useState } from 'react';

import {
  createClasses,
  isAuthenticated,
  getAllClasses,
  deleteClass,
  updateClass,
  getAClass,
  getAllSubjects,
  getAllStandards,
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

const ClassLink = () => {
  const [classO, setclassO] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [std, setstandard] = useState([]);
  const [, seterrorS] = useState(false);
  const [, seterrorF] = useState(false);
  const [update, setupdate] = useState(false);
  const [uid, setuid] = useState('');
  const [sub, setsubject] = useState([]);


  const loadAllSubjects = () => {
    getAllSubjects().then((data) => {
      //   console.log(data)
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          seterrorF(data.error);
        } else {
          setsubject(data);
        }
    });
  };
  useEffect(() => {
    loadAllSubjects();
  }, []);


  const loadAllclasses = () => {
    getAllClasses().then((data) => {
      //   console.log(data)
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          seterrorF(data.error);
        } else {
          setclassO(data);
          console.log(data,"opopop")
        }
    });
  };
  const [refresh, setrefresh] = useState(true);

  useEffect(() => {
    loadAllclasses();
  }, [refresh]);

  const successMessage = () => {
    
    return (
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

  // const {dispatch} = useContext(TodoContext)
  const { user } = isAuthenticated();
  // console.log(user)
  const nameT = user.name;
  const emailT = user.email;
  const [classSingle, setclassSingle] = useState({
    classLink: '',
    name: nameT,
    email: emailT,
    subject: '',
    owner: user._id,
    subjectname: '',
    Class: '',
    standard: '',
    time: '',
    date: '',
    error: '',
    success: false,
  });
  const {classLink,name,email,subject,owner,subjectname,time,date,success,error,} = classSingle;

  const [subId, setsubId] = useState()


  const handleChange = (name) => (event) => {
    if(name === "subject"){
      setsubId(event.target.sid)
    }
    setclassSingle({
      ...classSingle,
      error: false,
      [name]: event.target.value,
    });
  };

  console.log(subId,subject,subjectname,"pppppppppp")
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(classSingle,"finall");
    setclassSingle({
      ...classSingle,
      error: false,
    });

    createClasses({ classLink,name,email,subject,owner,subjectname,time,date },subject)
      .then((data) => {
        console.log(data);
        console.log(classSingle);
        if (data.error) { toast(data.error,{type:"error"})
          setclassSingle({
            ...classSingle,
             
            success: false,
          });
        } else {
          setclassSingle({
            ...classSingle,
            classLink: '',
            subject: '',
            owner: user._id,
            subjectname: '',
            Class: '',
            standard: '',
            time: '',
            date: '',
            error: ''
          });
          toast("Class Added",{type:"success"})
          setrefresh(!refresh);
        }
      })
      .catch(console.log('Error in classes'));
  };

  const deleteaClass = (catuctId) => {
    deleteClass(catuctId).then((data) => {
      console.log(data);
      if (data.error) { toast(data.error,{type:"error"})
        console.log(data.error);
        // setValues({...values,error:data.error})
      } else {
        setrefresh(!refresh);
      }
    });
  };

  const getClass = (classId) => {
    getAClass(classId).then((data) => {
      console.log(data.date, 'd');
      if (data.error) { toast(data.error,{type:"error"})
        console.log(data.error);
        // setValues({...values,error:data.error})
      } else {
        setclassSingle({
          ...classSingle,
          classLink: data.classLink,
          subject: data.subject,
          standard: data.standard,
          time: data.time,
          date: data.date,
        });
        setuid(data._id);
        setupdate(true);
        setrefresh(!refresh);
      }
    });
  };
  const updateaClass = (event, cid) => {
    event.preventDefault();
    setclassSingle({
      ...classSingle,
      error: false,
    });
    updateClass(cid, {
      classLink,
      name,
      email,
      subject,
      time,
      date,
    }).then((data) => {
      console.log(data);
      if (data.error) { toast(data.error,{type:"error"})
        console.log(data.error);
        // setValues({...values,error:data.error})
      } else {
        setclassSingle({
          ...classSingle,
          classLink: '',
          subject: '',
          Class: '',
          standard: '',
          time: '',
          date: '',
          error: ''
        });
        toast("Class Updated",{type:"success"})
        setrefresh(!refresh);
        setupdate(false);
      }
    });
  };

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
              <th className='border-0'>Subject with standard</th>
              <th className='border-0'>Time</th>
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
                      name={classLink}
                      id={classLink}
                      placeholder='Class link here..'
                      value={classLink}
                      onChange={handleChange('classLink')}
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
                <Input
                  type='time'
                  name='todo'
                  id='todo'
                  placeholder=' : '
                  value={time}
                  onChange={handleChange('time')}
                  style={{ maxWidth: '100px' }}
                ></Input>
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
                      updateaClass(e, uid);
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
            {classO.map((obj, i) => {
              if (obj.email === emailT) {
                console.log(obj);
                return (
                  <tr key={i}>
                    <td>
                      <div className='d-flex no-block align-items-center'>
                        <div className=''>
                          <h5 className='mb-0 font-16 font-medium'>
                            <span>
                              <a
                                href={obj.classLink}
                                rel='noopener noreferrer'
                                target='_blank'
                              >
                                Start Class
                              </a>
                            </span>
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td>{obj.subject.name}({obj.subject.standard})</td>
                    {/* {console.log(obj,obj.subject,"jkjkjk")} */}
                    {/* <td>{obj.standard}</td> */}
                    <td>{obj.time}</td>
                    <td className='blue-grey-text  text-darken-4 font-medium'>
                      {obj.date.substring(8, 10)}
                      {obj.date.substring(4, 7)}-{obj.date.substring(0, 4)}
                    </td>
                    <td>
                      <i
                        className='fa fa-plus text-info'
                        style={{ cursor: 'pointer', marginRight: '20px' }}
                        onClick={() => {
                          getClass(obj._id);
                        }}
                        aria-hidden='true'
                      ></i>
                      <i
                        className='fa fa-trash text-orange'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          deleteaClass(obj._id);
                        }}
                        aria-hidden='true'
                      ></i>
                    </td>
                  </tr>
                );
              }
              return <tr key={i}></tr>;
            })}
          </tbody>
        </Table>
        {classO.length === 0 && (
          <h3 className='text-center'> No Classes to take</h3>
        )}
      </CardBody>
    </Card>
  );
  return <React.Fragment>{dashboard()}</React.Fragment>;
};

export default ClassLink;
