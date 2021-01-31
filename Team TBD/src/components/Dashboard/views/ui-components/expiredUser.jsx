import React, { useState,useEffect } from 'react';

// import $ from 'jquery';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table
} from 'reactstrap';

import { Modal } from 'react-bootstrap'

import { toast } from 'react-toastify';
import {
  getAllSubjects,
  addSubject,
  getExpiredUSers
} from '../../../helper';

const Projects = () => {
  const [userO, setuserO] = useState([]);
  const [sub, setsubject] = useState([]);
  const [errorF, seterrorF] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [u, setU] = useState({
    name: '',
    email: '',
    subject: '',
    expiresOn: '',
    validity: 0,
  });
  const { name, email, subject, validity,expiresOn } = u;
  const [showModal, setshowModal] = useState({
    isOpen:false,
    stId:""
  })

  const handleCloseModal = ()=>{
    setshowModal({...showModal,isOpen:false})
  }

  const loadUsers = () => {
    getExpiredUSers(u)
      .then((data) => {
        if (data.error) { 
          toast(data.error,{type:"error"})
          } else {
            setuserO(data);
          }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadUsers();
  }, [refresh]);

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

  const users = [];

  const handleChange = (name) => (event) => {
      setU({
        ...u,
        [name]: event.target.value,
      })
      // console.log(d.getDate(),d,"month",u,k)

  };


  const addSubjectToUser = (userId) => {
    console.log(subject,"ll")
    addSubject({ user_id: userId, subject_id: subject, value: validity,expiresOn: expiresOn }).then(
      (data) => {
        console.log(data,"l");
        if (!data?.error) {setRefresh(!refresh);
        toast("Validity Updated Successfully",{type:"success"})
        }
        else {
          console.log(data.error)
          toast(data.error,{type:"error"})
        
        }
      }
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loadUsers();
  };

  const dashboard = () => (
    <Card>
      <CardBody>
        <div className='d-flex align-items-center'>
          <div>
            <CardTitle className='font-weight-bold'>Students with expired subjects:</CardTitle>
            <CardSubtitle>To Add or Edit Subject</CardSubtitle>
          </div>
        </div>
        
        <Table className='no-wrap v-middle' responsive>
          <thead>
            <tr className='border-0'>
              <th className='border-0'>Name</th>
              <th className='border-0'>Email</th>
              <th className='border-0'>Subject</th>
              <th className='border-0'>ExpiresOn</th>
            </tr>
          </thead>
          <tbody>
            {userO.map((obj, i) => {
              if (obj.role !== 0) {
                return <></>;
              }
              return (
                <tr key={`user${obj._id}`} className='userlist'>
                  <td>{obj.name}</td>
                  <td>{obj.email}</td>
                  <td colSpan='3'>
                  {obj.subject.map((sub, i) => {
                      return (
                        new Date(sub.expiresOn) < new Date(Date.now()) && (<>
                          <div className='d-flex justify-content-between py-2'>
                            <span>
                              {sub.name}
                            </span>

                            <span>
                              {sub.expiresOn ? (<>{sub.expiresOn.substring(8, 10)}-{sub.expiresOn.substring(5, 7)}-{sub.expiresOn.substring(0,4)}</>) : <>-</>}
                            </span>
                          </div>
                        </>)
                      );
                    })}
                  </td>
                  {/* <td>{obj.expiresOn}</td> */}
                  <td>
                    <button
                      className='btn btn-sm btn-outline-primary'
                      onClick={()=>{setshowModal({
                        isOpen:true,
                        stId: obj._id
                      })}}
                    >
                      Update Expiry
                    </button>
                  </td>
                   {/* <td><i class="fa fa-plus text-info" style={{cursor:"pointer",marginRight:"20px"}} onClick={()=>{getSubject(obj._id)}} aria-hidden="true"></i>
                            <i class="fa fa-trash text-orange" style={{cursor:"pointer"}} onClick={()=>{deleteaSubject(obj._id)}} aria-hidden="true"></i></td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
        
        <Modal show={showModal.isOpen} onHide={handleCloseModal}>
                   <h3 className="my-4 text-center">Update Expiry</h3>
                   <div className="p-4">
                   <Input
                      type='select'
                      className='custom-select mt-2'
                      value={subject}
                      onChange={handleChange('subject')}
                    >
                      <option value='0' selected>
                        Subject
                      </option>
                      {sub.map((obj, i) => {
                        return (
                          <option key={i} value={obj._id}>
                            {obj.name}
                          </option>
                        );
                      })}
                    </Input>
                    <Input
                      type='date'
                      name={expiresOn}
                      id={expiresOn}
                      placeholder='0'
                      value={expiresOn}
                      className='mt-2'
                      onChange={handleChange('expiresOn')}
                    ></Input>
                    <button
                      className='btn btn-sm btn-outline-primary mt-2'
                      onClick={()=>{ console.log("o");addSubjectToUser(showModal.stId)}}
                    >
                      Add
                    </button>
                  
                   </div>
                  </Modal>
                 
        {userO.length === 0 && (
          <h3 className='text-center'>No Students Enrolled</h3>
        )}
      </CardBody>
    </Card>
  );
  return <React.Fragment>{dashboard()}</React.Fragment>;
};

export default Projects;
