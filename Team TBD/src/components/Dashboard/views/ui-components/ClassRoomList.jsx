import React, { useState, useEffect } from "react";
import { subclassrooms, isAuthenticated } from "../../../helper/index";

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
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const ClassRoomList = () => {
  const { user } = isAuthenticated();
  const [classrooms, setclassrooms] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const loadAllMyclassrooms = () => {
    console.log(user._id, "heyya");
    subclassrooms({ user_id: user._id }).then((data) => {
      console.log(data, "classroomdata");
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
        } else {
          setclassrooms(data);
          console.log(classrooms,"classsss")
        }
      }
    });
  };

  useEffect(() => {
    loadAllMyclassrooms();
    if (localStorage.getItem("attemptedquiz"))
      localStorage.removeItem("attemptedquiz");
  }, [refresh]);

  return (
    <React.Fragment>
      <h3 className="text-center">CLASSROOMS</h3>
      <hr></hr>
      {classrooms.length === 0 && (
        <h3 className="text-center">
          You Are Not Admitted To Any ClassRoom Yet
        </h3>
      )}
      <Row>
        {classrooms.map((obj, i) => {
          return (
            // <tr key={i}>
            <Col xs="12" md="4">
              <Card key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: "5rem",
                    background: "linear-gradient(45deg, #1273BE, violet",
                  }}
                ></div>
                <CardTitle>{obj.name}</CardTitle>
                <CardSubtitle>{obj.subject.name}</CardSubtitle>
                <CardBody>{obj.description}</CardBody>
                <div>
                  {isAuthenticated() ? (
                    // && isAuthenticated().user.role === 1
                    <p>
                      <Link classid="Hello" to={`/myclassroom/${obj._id}`}>
                        See More
                      </Link>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default ClassRoomList;
