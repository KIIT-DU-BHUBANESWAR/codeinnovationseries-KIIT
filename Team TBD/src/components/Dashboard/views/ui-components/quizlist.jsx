import React, { useState, useEffect } from "react";
import {
  getQuiz,
  isAuthenticated,
  subquizzes,
  getAUser,
} from "../../../helper/index";
import { toast } from 'react-toastify';
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
import { Link, withRouter } from "react-router-dom";

const QuizList = (props) => {
  const { user, token } = isAuthenticated();
  const [quizzes, setquizzes] = useState([]);
  const [refresh, setrefresh] = useState(true);
  
  const loadAllMyQuizzes = () => {
    // console.log(user._id, "heyy");
    subquizzes({ user_id: user._id }).then((data) => {
      console.log(data, "quizdata");
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
        } else {
          setquizzes(data);
        }
      }
    });
  };
  const [aquiz, setaquiz] = useState([]);
  const getUser = () => {
    getAUser(user._id, token).then((data) => {
      console.log(data, "userdata");
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
        } else {
          setaquiz(data.quiz);
        }
      }
    });
  };
  // console.log(aquiz)

  useEffect(() => {
    loadAllMyQuizzes();
    getUser();
    if (localStorage.getItem("attemptedquiz"))
      localStorage.removeItem("attemptedquiz");
  }, [refresh]);

  const check = (id) => {
    if (aquiz.filter((e) => e == id).length === 0) {
      return true;
    } else {           
      console.log("trip")
      return false;
    }
  };

  const startTest = (e) => {
    localStorage.setItem("start", Date.now());
    return true;
  };

  return (
    <React.Fragment>
      {quizzes.length === 0 && (
        <h3 className="text-center">No Quizzes For Today</h3>
      )}
      {quizzes.map((obj, i) => {
        // check(obj._id)
        // console.log(aquiz,obj._id)
        // console.log(aquiz.filter(e => e == obj._id))
        return (
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <CardTitle>{obj.title}</CardTitle>
                  <CardSubtitle>{obj.subject.name}</CardSubtitle>
                </div>
              </div>

              {check(obj._id) ? (
                !localStorage.getItem("start") && (
                  <a
                    href={`/start/quiz/${obj._id}`}
                    onClick={() => startTest()}
                  >
                    {" "}
                    Start{" "}
                  </a>
                )
              ) : (
                <span className="text-success">Attempted</span>
              )}
            </CardBody>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default withRouter(QuizList);
