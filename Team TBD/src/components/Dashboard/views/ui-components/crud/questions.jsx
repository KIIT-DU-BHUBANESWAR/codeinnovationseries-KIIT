
import React,{useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Input,
    Table,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Button
} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import {createQuestion, createOption, getQuestions, deleteQuestion, deleteOption,updateQuiz, deleteQuiz} from '../../../../helper';

import UpdateQuestion from '../../../../UpdateQuestion'
import UpdateOption from '../../../../UpdateOption'
import AddOption from '../../../../AddOption'
import ImageHelper from '../../../../helper/ImageHelper';
import { toast } from 'react-toastify';
const Questions = (props) => {

    const qid= props.location.pathname;
    console.log(props,qid,"popo",qid.substring(6,))
    const [quiz, setquiz] = useState({
      title:"",
      subject:"",
      questions:[],
      endtime:"",
      start:""
    })
    const [qarray, setqarray] = useState([{
      title: "",
      img:"",
      hasImg:false,
      formData:""
  }])

  const {title,img,formData} = qarray

    const loadQuiz=()=>{
        console.log(qid,"id")

        getQuestions(qid).then(data=>{
          if(data){
            if(data.error){
              console.log(data.error)
            }
            else{
              setquiz(data.data[0])
              setqarray({
                ...qarray, formData: new FormData()
              })
             
            }
          }
        })

         
    }

    const handleChange = name => event => {
      const v = name === "img"? event.target.files[0]:event.target.value
      
      formData.set(name,v)
      if( name !== "img" )
      setqarray({
          ...qarray, [name]:v
      })
      if(name === "img")
      formData.set("hasImg",true)
     
  }

    const [refresh, setrefresh] = useState(true)

    useEffect(() => {
        loadQuiz()
    }, [refresh])
    const [options, setoptions] = useState([]);
  const [zId, setzId] = useState()
  const [show, setshow] = useState(false);
  const [showA, setshowA] = useState(false);
  const [oId, setoId] = useState()
  const [showo, setshowo] = useState(false);
  const [showoA, setshowoA] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = (id) => {setshow(true);
  setzId(id)
  }
  const handleCloseO = () => setshowo(false);
  const handleShowO = (id) => {
  setshowo(true);
  setoId(id)
  }
  // const handleCloseA = () => setshow(false);
  // const handleShow = (id) => {setshow(true);
  // setzId(id)
  // }
  const handleCloseOA = () => setshowoA(false);
  const handleShowOA = (id) => {
  setshowoA(true);
  setzId(id)
  }

  // handle input change
  const handleInputChange = (e, index) => {
    const { name } = e.target;
    const list = [...options];
    list[index][name] = !list[index][name];
    setoptions(list);
    console.log(options)
  };
  const handleInputChangeN = (e, index) => {
    const { name, value } = e.target;
    const list = [...options];
    list[index][name] = value;
    setoptions(list);
    console.log(options)
  };
  
  const handleRemoveClick = index => {
    const list = [...options];
    list.splice(index, 1);
    setoptions(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setoptions([...options, { optionValue: "", isCorrect: false }]);
  };
const [quesId, setquesId] = useState({id: 0})
  const onSubmit = ()=>{
    setqarray({...qarray,options:options})
    console.log(qarray)
    createQuestion(qid,formData).then(data=>{console.log("f",data)
       if(data){     
      if(data.error)
      {
          console.log(data.error)
          // setValues({...values,error:data.error})
      }
      else{
        console.log("XD<3",data)
        setquesId({...quesId, id: data.data._id})
        handleAddClick()
      }
    }
  })
  }

  const onOptionSubmit = ()=>{
    options.map((x) =>{
      console.log(x)
      createOption(quesId.id,x).then(data=>{console.log("f",data)
          if(data){     
          if(data.error)
          {
              console.log(data.error)
              // setValues({...values,error:data.error})
          }
          else{
            // console.log("Options createdd XD<3")
            setoptions([])

            setrefresh(!refresh)
            setqarray([{...qarray,
              title: "",
              img:"",
              hasImg:false,
              formData:""
          }])
          }
        }
      })
    })
    
  }

  const deleteAQuestion = (questionId)=>{
    deleteQuestion(qid,questionId).then(data=>{
      if(data){
        if(data.error){
          console.log(data.error)
        }
        else{
          setrefresh(!refresh)
        }
      }
    })
  }
  const deleteAOption = (oid,questionId)=>{
    deleteOption(oid,questionId).then(data=>{
      if(data){
        if(data.error){
          console.log(data.error)
        }
        else{
          setrefresh(!refresh)
        }
      }
    })
  }

  const publishStatus = (id,status) => {
    updateQuiz(id, {published:status })
      .then((data) => {
        // console.log(data)
        if (data)
          if (data.error) { 
            toast(data.error,{type:"error"})
            // console.log(data.error)
            
          } else {
            toast("Quiz Status:"+status,{type:"success"})
            setrefresh(!refresh)
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

  const nextChar = (c,k)=> {
    return String.fromCharCode(c.charCodeAt(0) + k);
}
 
const loadrefresh = ()=>{
  setrefresh(!refresh)
}
    return(
    <React.Fragment>
          <div >
            <Row>
                <Col xs="12" md="12">
                    {/*--------------------------------------------------------------------------------*/}
                    {/*Card-1*/}
                    {/*--------------------------------------------------------------------------------*/}
                    <Card>
                        {/* <CardImg top width="100%" src={img2} /> */}
                        <CardBody>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardSubtitle>{quiz.subject.name}</CardSubtitle>
                            <CardSubtitle>Standard - {quiz.subject.standard}</CardSubtitle>
                            {options.length === 0 ?
                            (<React.Fragment>
                              <Input
                                    type="file"
                                    name="img"
                                    id="img"
                                    onChange = {handleChange("img")}
                                    value={img}
                                    accept="image"
                                    style={{marginTop:"1rem"}}
                            ></Input>
                              <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange = {handleChange("title")}
                                    value={title}
                                    placeholder="Enter your question"
                                    style={{marginTop:"1rem"}}
                            ></Input>
                            </React.Fragment>
                            ):<div>{title}</div>
                            }
                            <Table className="no-wrap v-middle" responsive>
                                    <thead>
                                        <tr className="border-0">
                                        {options.length > 0 && <th className="border-0">Option Value(Check the correct option/s)</th>}
                                            
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                            {options.map((x, i) => {
                                return (
                                        <tr>
                                            <td>
                                              <div className="d-flex no-block align-items-center">
                                              <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <Input addon type="checkbox" id="hi" name="isCorrect" onChange={e=>handleInputChange(e,i)} aria-label="Checkbox for following text input" />
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Enter Option" name="optionValue" onChange={e=>handleInputChangeN(e,i)}/>
                                              </InputGroup>
                                              </div>
                                            </td>
                                            <td>

                                              <div className="d-flex no-block align-items-center">
                                              
                                                  {options.length !== 1 && <button
                                                    className="mr10"
                                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                                  {options.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                                
                                              </div>
                                            </td>
                                            
                                        </tr>
                                   
                                 
                                );
                              })}
                               </tbody>
                            </Table>
                            {options.length === 0 ? (<button onClick={onSubmit}>Create Question</button>):(<button onClick={onOptionSubmit}>Save Options</button>)}
                            
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="12">
                  <Card>
                    <CardBody>
                      <Table>
                        <tbody>
                          {quiz.questions.map((x,i)=>(
                            <tr>
                              {console.log(x,"hh")}
                              <td>
                            <React.Fragment>
                              <div className="row">
                              <span className="col-11">{i+1}. {x.title}{x.hasImg && <ImageHelper id={x._id}></ImageHelper>}</span>
                            
                            <span className="col-1 text-center"><i className="fa fa-plus text-info" onClick={()=>{handleShow(x._id)}} style={{cursor:"pointer",marginRight:"20px"}}  aria-hidden="true"></i>
                            <i className="fa fa-trash text-orange" onClick={()=>{deleteAQuestion(x._id)}} style={{cursor:"pointer"}}  aria-hidden="true"></i></span>
                            </div>
                            
                            <br></br>

                            <div style={{marginLeft:"3em"}}>
                              <Table className="no-wrap v-middle" responsive>
                                <tbody>
                                  
                                    {x.options.map((y,j)=>(
                                      y.isCorrect ? (
                                      <tr className="text-success">
                                      <td>{nextChar('a',j)}. {y.optionValue}</td>
                                      <td><i className="fa fa-plus text-info" onClick={()=>{handleShowO(y._id)}} style={{cursor:"pointer",marginRight:"5px",marginLeft:"5px",fontSize:"0.7em"}}  aria-hidden="true"></i></td>
                                      <td><i className="fa fa-trash text-orange" style={{cursor:"pointer",marginRight:"5px",marginLeft:"5px",fontSize:"0.7em"}}  aria-hidden="true"></i></td><br></br></tr>):(<tr>
                                        <td>{nextChar('a',j)}. {y.optionValue}</td>
                                      <td><i className="fa fa-plus text-info" onClick={()=>{handleShowO(y._id)}} style={{cursor:"pointer",marginRight:"5px",marginLeft:"5px",fontSize:"0.7em"}}  aria-hidden="true"></i></td>
                                      <td><i className="fa fa-trash text-orange" onClick={()=>{deleteAOption(y._id,x._id)}} style={{cursor:"pointer",marginRight:"5px",marginLeft:"5px",fontSize:"0.7em"}}  aria-hidden="true"></i></td><br></br>
                                      </tr>)
                                    ))}
                                  
                                </tbody>
                              </Table>
                              </div>
                                {/* <div className="row"> */}
                                  <div className="d-flex flex-row-reverse">
                                        <button onClick={()=>{handleShowOA(x._id)}} style={{margin:"auto"}} className="btn btn-outline-success">Add Option</button>
                                  </div>
                                    
                                {/* </div> */}
                            <Modal show={show} onHide={handleClose}>
                                  <UpdateQuestion id={zId} ></UpdateQuestion>
                            </Modal>
                            <Modal show={showo} onHide={handleCloseO}>
                                  <UpdateOption id={oId} loadrefresh={()=>loadrefresh()} hide={()=>handleCloseO()}></UpdateOption>
                            </Modal>
                            <Modal show={showoA} onHide={handleCloseOA}>
                                  <AddOption id={zId} loadrefresh={()=>loadrefresh()} hide={()=>handleCloseO()}></AddOption>
                            </Modal>
                            
                            </React.Fragment>
                            </td>
                            </tr>
                          ))}
                          </tbody>
                       </Table>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" md="12" alignItems="right">
                    <div className="d-flex">
                          {!quiz.published ? (<button onClick={()=>{publishStatus(qid.substring(6,),true)}} style={{margin:"auto"}} className="btn btn-success">Publish</button>):(<button onClick={()=>{publishStatus(qid.substring(6,),false)}} style={{margin:"auto"}} className="btn btn-warning">Archive</button>)}
                    
                          <button onClick={()=>{deleteAQuiz(qid.substring(6,))}} style={{margin:"auto"}} className="btn btn-danger">Delete Permanently</button>
                    </div>
                </Col>
            </Row>
          </div>
          
    </React.Fragment>)
}
export default Questions;