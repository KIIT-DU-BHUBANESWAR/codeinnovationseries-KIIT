/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import $ from 'jquery';
// import TopHeader from "./TopHeader.js";
// import Navbar from "./Navbar";
import ClassroomTitle from '../../../ClassroomTitle';
import UploadDocument from '../../../UploadDocument';
import UploadAssignment from '../../../UploadAssignment';
import {
  getAClassroom,
  getAllUSers,
  updateClassroom,
  deleteClassroom,
  isAuthenticated,
} from '../../../helper/index';

const ClassRoom = (props) => {
  console.log(isAuthenticated());

  const crid = props.match.params.handle;
  const Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [project, setProject] = useState({
    name: '',
    description: '',
    subject: '',
    standard: '',
    error: '',
    members: [],
    doc: [],
    success: false,
  });
  const [refresh, setrefresh] = useState(true);
  const [userO, setuserO] = useState([]);
  const [errorF, seterrorF] = useState(false);
  var students = 0;
  var studentsarray = [];

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
    loadAllusers();
  }, []);

  const getClassroom = (cid) => {
    getAClassroom(cid).then((data) => {
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
          members: data.members,
          doc: data.doc,
          assignment: data.assignment,
        });
        setrefresh(false);
      }
    });
  };

  useEffect(() => {
    getClassroom(crid);
  }, [refresh]);

  return (
    <React.Fragment>
      {/* <ClassroomTitle
        title={project.name}
        body={project.description}
      ></ClassroomTitle> */}
      <div style={{ textAlign: 'center' }}>
        <h2>{project.name}</h2>
        <hr style={{ width: '50%', margin: 'auto' }}></hr>
        <h4>{project.description}</h4>
      </div>
      <div className='text-center'>
        <Row style={{ width: '100%', margin: 'auto' }}>
          {/* <CardImg top width="100%" src={img2} /> */}
          {isAuthenticated() ? (
            <Col xs='12' md='12'>
              {/*--------------------------------------------------------------------------------*/}
              {/*Card-1*/}
              {/*--------------------------------------------------------------------------------*/}
              <Card>
                <CardBody>
                  <UploadDocument id={crid}></UploadDocument>
                </CardBody>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {isAuthenticated() ? (
            <Col xs='12' md='12'>
              {/*--------------------------------------------------------------------------------*/}
              {/*Card-1*/}
              {/*--------------------------------------------------------------------------------*/}
              <Card style={{ overflowX: 'scroll' }}>
                <CardBody>
                  <UploadAssignment id={crid}></UploadAssignment>
                </CardBody>
              </Card>
            </Col>
          ) : (
            ''
          )}

          {isAuthenticated().user.role === 1 ? (
            <Col xs='12' md='12'>
              {/*--------------------------------------------------------------------------------*/}
              {/*Card-1*/}
              {/*--------------------------------------------------------------------------------*/}
              <Card style={{ overflowX: 'scroll' }}>
                <CardBody>
                  <h2>Member List</h2>
                  <Table>
                    <th>Names</th>
                    <th>Standard</th>
                    <th>Contact</th>
                    {project.members.map((obj, i) => {
                      return (
                        // <tr key={i}>

                        <tr key={i}>
                          <td>{obj.name}</td>
                          <td>{obj.standard}</td>
                          <td>{obj.mob}</td>
                          {/* <CardSubtitle>{obj.subject}</CardSubtitle>
                                        <CardBody>{obj.description}</CardBody> */}
                        </tr>
                      );
                    })}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};
export default ClassRoom;
