import React, { useState, useEffect } from 'react';
import { getAllClassrooms, isAuthenticated } from '../../../helper/index';

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
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const TeacherClassRoomList = () => {
  const { user } = isAuthenticated();
  const Tid = user._id;
  const [classrooms, setclassrooms] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const loadAllclassroooms = () => {
    getAllClassrooms().then((data) => {
      console.log(data);
      if (data) {
        if (data.error) {
          toast(data.error, { type: 'error' });
          console.log(data.error);
        } else {
          setclassrooms(data);
        }
      }
    });
  };
  useEffect(() => {
    loadAllclassroooms();
  }, []);

  return (
    <React.Fragment>
      <h4>CLASSROOMS</h4>
      <hr></hr>
      <Row>
        {classrooms.length === 0 && (
          <h3 className='text-center'> No classroom has been created</h3>
        )}
        {classrooms.map((obj, i) => {
          if (Tid.toString() === obj.owner._id.toString()) {
            return (
              // <tr key={i}>
              <Col xs='12' md='4' key={i}>
                <Card
                  style={{
                    borderRadius: '10px 10px 10px 10px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '5rem',
                      background: 'linear-gradient(45deg, #1273BE, violet)',
                      borderRadius: '10px 10px 0 0',
                    }}
                  ></div>
                  <CardTitle>{obj.name}</CardTitle>
                  <CardSubtitle>{obj.subject.name}</CardSubtitle>
                  <CardSubtitle>{obj.standard}</CardSubtitle>
                  <CardBody>{obj.description}</CardBody>
                  <div>
                    {isAuthenticated() ? (
                      // && isAuthenticated().user.role === 1
                      <p>
                        <Link to={`/teacherClassroom/${obj._id}`}>
                          See More
                        </Link>
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </Card>
              </Col>
            );
          }
        })}
      </Row>
    </React.Fragment>
  );
};

export default TeacherClassRoomList;
