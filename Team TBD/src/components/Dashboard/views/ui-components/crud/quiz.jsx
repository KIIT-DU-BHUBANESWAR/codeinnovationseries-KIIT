import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  uploadDocument,
  getAllStandards,
  getAllSubjects,
  getAllUSers,
  isAuthenticated,
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  getAQuiz,
} from "../../../../helper/index";
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

const AddQuiz = ({ c }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    subject: "",
    standard: "",
    title: "",
    endTime: "",
    start: "",
    teacher: user._id,
    hh: "",
    mm: "",
    duration: "",
    loading: false,
    error: "",
    getRedirect: false,
    createdQuiz: "",
    formData: "",
  });

  const [quizzes, setquizzes] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const [update, setupdate] = useState(false);
  const [sub, setsubject] = useState([]);
  const [std, setstandard] = useState([]);
  const [errorS, seterrorS] = useState(false);
  const [errorF, seterrorF] = useState(false);

  const loadAllSubjects = () => {
    getAllSubjects().then((data) => {
      console.log(data);
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

  const loadAllStandards = () => {
    getAllStandards().then((data) => {
      console.log(data);
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          seterrorS(data.error);
        } else {
          setstandard(data);
        }
    });
  };
  useEffect(() => {
    loadAllStandards();
  }, []);

  const loadAllMyQuizzes = () => {
    // console.log(user._id,"heyy")
    getQuiz(user._id).then((data) => {
      // console.log(data,"quizdata")
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          // console.log(error)
        } else {
          setquizzes(data.data);
        }
      }
    });
  };
  useEffect(() => {
    loadAllMyQuizzes();
  }, [refresh]);
  // console.log(quizzes,"njnjnjnjjjjjjjjjjjjjjjj")
  const {
    subject,
    standard,
    title,
    endTime,
    start,
    duration,
    loading,
    error,
    getRedirect,
    createdQuiz,
    formData,
    teacher,
    hh,
    mm,
  } = values;

  const successMessage = () => {
    console.log(createdQuiz);
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: createdQuiz ? "" : "none" }}
          >
            Quiz Added to DB.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const handleChange = (name) => (event) => {
    const v = name === "img" ? event.target.files[0] : event.target.value;

    setValues({ ...values, [name]: v });
    //  console.log(values)
  };

  const Submit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, teacher: user._id });
    createQuiz({ title, subject, teacher, mm })
      .then((data) => {
        // console.log(data)
        if (data)
          if (data.error) { toast(data.error,{type:"error"})
            // console.log(data.error)
            setValues({ ...values,   });
          } else {
            // console.log(data,"quiz")
            setValues({
              ...values,
              subject: "",
              standard: "",
              title: "",
              endTime: "",
              start: "",
              hh: "",
              mm: "",
              duration: "",
              loading: false,
              createdQuiz: true,
            });
            setrefresh(!refresh);
          }
      })
      .catch(() => {
        // console.log("Error in creating Quiz")
      });
  };

  const deleteAQuiz = (id) => {
    deleteQuiz(id).then((data) => {
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          // console.log(data.error)
        } else {
          setrefresh(!refresh);
        }
      }
    });
  };

  const getTheQuiz = (id) => {
    getAQuiz(`/quiz/${id}`).then((data) => {
      if (data) {
        if (data.error) { toast(data.error,{type:"error"})
          // console.log(data.error)
        } else {
          setqid(id);
          setupdate(!update);
          setValues({
            ...values,
            subject: data.data[0].subject,
            title: data.data[0].title,
            mm: data.data[0].duration,
          });
        }
      }
    });
  };
  const [qid, setqid] = useState(null);
  const updateAquiz = (id) => {
    updateQuiz(id, { title, subject, endTime, start, teacher, mm })
      .then((data) => {
        // console.log(data)
        if (data)
          if (data.error) { toast(data.error,{type:"error"})
            // console.log(data.error)
            
          } else {
            setupdate(!update);
            setValues({
              ...values,
              subject: "",
              standard: "",
              title: "",
              endTime: "",
              start: "",
              hh: "",
              mm: "",
              duration: "",
              loading: false,
              createdQuiz: true,
            });
            setrefresh(!refresh);
          }
      })
      .catch(() => {
        // console.log("Error in creating Quiz")
      });
  };

  const catForm = () => (
    <form>
      <Row>
        <Card className="card-teacher">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <CardTitle>Add Quiz</CardTitle>
                <CardSubtitle>
                  Click on them to add/update questions
                </CardSubtitle>
              </div>
            </div>
            {successMessage()}
            {errorMessage()}
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Name</th>
                  <th className="border-0">Subject/Standard</th>
                  <th className="border-0">Test Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-group">
                      <input
                        onChange={handleChange("title")}
                        name="title"
                        className="form-control"
                        placeholder="title"
                        value={title}
                      />
                    </div>
                  </td>
                  {/* <td>
                      <div className="form-group">
                        <input
                          onChange={handleChange("subject")}
                          name="subject"
                          className="form-control"
                          placeholder="subject"
                          value={subject}
                        />
                      </div>
                      </td> */}

                  <td>
                    <Input
                      type="select"
                      className="custom-select"
                      value={subject}
                      onChange={handleChange("subject")}
                    >
                      <option value="0">Select</option>
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
                    <input
                      onChange={handleChange("mm")}
                      type="number"
                      name="start"
                      className="form-control"
                      placeholder="mm"
                      // style={{width:"40%"}}
                      value={mm}
                    />
                  </td>

                  <td>
                    {update === true ? (
                      <i
                        onClick={(e) => {
                          updateAquiz(qid);
                        }}
                        style={{
                          cursor: "pointer",
                          marginTop: "6px",
                          fontSize: "20px",
                        }}
                        className="fa fa-check text-success"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        onClick={Submit}
                        style={{
                          cursor: "pointer",
                          marginTop: "6px",
                          fontSize: "20px",
                        }}
                        className="fa fa-plus text-success"
                        aria-hidden="true"
                      ></i>
                    )}
                  </td>
                </tr>

                {quizzes &&
                  quizzes.map((obj, index) => {
                    // console.log(user._id.toString())
                    // console.log(obj.teacher.toString());
                    if (user._id.toString() === obj.teacher.toString()) {
                      return (
                        <tr key={index}>
                          <td>{obj.title}</td>
                          <td>{obj.subject.name}({obj.subject.standard})</td>
                          <td>{obj.duration}</td>
                          <td>
                            <Link to={`/quiz/${obj._id}`}>Add Questions</Link>{" "}
                          </td>
                          <td>
                            <Link to={`/responses/${obj._id}`}>
                              View Responses
                            </Link>{" "}
                          </td>
                          <td>
                            <i
                              className="fa fa-plus text-info"
                              style={{ cursor: "pointer", marginRight: "20px" }}
                              onClick={() => {
                                getTheQuiz(obj._id);
                              }}
                              aria-hidden="true"
                            ></i>
                            <i
                              className="fa fa-trash text-orange"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteAQuiz(obj._id);
                              }}
                              aria-hidden="true"
                            ></i>
                          </td>
                        </tr>
                      );
                    }
                  })}
                {/* {console.log(quizzes.data)} */}
              </tbody>
            </Table>
            {quizzes.length === 0 && (
              <h3 className="text-center">No Quiz has been created</h3>
            )}
          </CardBody>
        </Card>
      </Row>
      <Row></Row>
    </form>
  );
  return <div>{catForm()}</div>;
};

export default AddQuiz;
