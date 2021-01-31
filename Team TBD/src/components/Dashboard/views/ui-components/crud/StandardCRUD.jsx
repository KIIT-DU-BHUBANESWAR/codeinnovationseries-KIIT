import React, { useState } from "react";

import {
  isAuthenticated,
  standards,
  getAllStandards,
  getAStandard,
  deleteStandard,
  updateStandard,
} from "../../../../helper/index";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from "reactstrap";
import { useEffect } from "react";
import { toast } from 'react-toastify';
const Projects = () => {
  const [standard, setstandard] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorF, seterrorF] = useState(false);
  const [update, setupdate] = useState(false);
  const [uid, setuid] = useState("");
  const [reload, setreload] = useState(false);

  const loadAllStandards = () => {
    getAllStandards().then((data) => {
      //   console.log(data)
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          seterrorF(data.error);
        } else {
          setstandard(data);
        }
    });
  };
  const [refresh, setrefresh] = useState(true);

  useEffect(() => {
    loadAllStandards();
  }, [refresh]);

  const successMessage = () => {
    return (
      <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Congratulations!!! Standard is added.
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
  // const {dispatch} = useContext(TodoContext)
  const { user } = isAuthenticated();
  // console.log(user)
  const [project, setProject] = useState({
    name: "",
    error: "",
    success: false,
  });
  const { name, success, error } = project;

  const handleChange = (name) => (event) => {
    setProject({
      ...project,
      error: false,
      [name]: event.target.value,
    });
  };
  const reloading = () => {
    setProject({
      ...project,
      error: false,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });

    standards({ name })
      .then((data) => {
        console.log(data);
        console.log(project);
        if (data)
          if (data.error) { toast(data.error,{type:"error"})
            setProject({
              ...project,
               
              success: false,
            });
          } else {
            toast("Standard Added",{type:"success"})
            setrefresh(!refresh);
          }
      })
      .catch(console.log("Error in standards"));
  };
  const deleteaStandard = (catuctId) => {
    deleteStandard(catuctId).then((data) => {
      console.log(data);
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setrefresh(!refresh);
        }
    });
  };
  const getStandard = (classId) => {
    getAStandard(classId).then((data) => {
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          setProject({
            ...project,
            name: data.name,
          });
          setuid(data._id);
          setupdate(true);
          setrefresh(!refresh);
        }
    });
  };
  const updateaStandard = (event, cid) => {
    event.preventDefault();
    setProject({
      ...project,
      error: false,
    });
    updateStandard(cid, { name }).then((data) => {
      console.log(data);
      if (data)
        if (data.error) { toast(data.error,{type:"error"})
          console.log(data.error);
          // setValues({...values,error:data.error})
        } else {
          toast("Standard Updated",{type:"success"})
          setrefresh(!refresh);
          setupdate(false);
        }
    });
  };
  //    useEffect(() => {
  //     setProject({
  //         ...project,error: false, name: nameT, email: emailT
  //     })
  //    })

  const dashboard = () => (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/

    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle>Add Standard</CardTitle>
            <CardSubtitle></CardSubtitle>
          </div>
        </div>
        {successMessage()}
        {errorMessage()}
        <Table className="no-wrap v-middle" responsive>
          <thead>
            <tr className="border-0">
              <th className="border-0">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input
                  type="text"
                  name={name}
                  id={name}
                  placeholder="Standard Name"
                  value={name}
                  onChange={handleChange("name")}
                ></Input>
              </td>

              <td>
                {update === true ? (
                  <i
                    onClick={(e) => {
                      updateaStandard(e, uid);
                    }}
                    style={{
                      cursor: "pointer",
                      marginTop: "6px",
                      fontSize: "20px",
                    }}
                    class="fa fa-check text-success"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i
                    onClick={onSubmit}
                    style={{
                      cursor: "pointer",
                      marginTop: "6px",
                      fontSize: "20px",
                    }}
                    class="fa fa-plus text-success"
                    aria-hidden="true"
                  ></i>
                )}
              </td>
            </tr>
            {standard.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>{obj.name}</td>
                  <td>
                    <i
                      class="fa fa-plus text-info"
                      style={{ cursor: "pointer", marginRight: "20px" }}
                      onClick={() => {
                        getStandard(obj._id);
                      }}
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fa fa-trash text-orange"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteaStandard(obj._id);
                      }}
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {standard.length === 0 && (
          <h3 className="text-center">No Standards Enlisted</h3>
        )}
      </CardBody>
    </Card>
  );
  return <React.Fragment>{dashboard()}</React.Fragment>;
};

export default Projects;
