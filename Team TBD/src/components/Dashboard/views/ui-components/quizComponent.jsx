/* eslint-disable no-lone-blocks */
import React, {useState,useEffect} from 'react';
import { getQuestions,createResponse,isAuthenticated } from '../../../helper/index';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Input  } from 'reactstrap';
import ImageHelper from '../../../helper/ImageHelper';
import NumberCard from './numberCard';
import Timer from './timer.jsx';
import { Redirect, withRouter } from 'react-router-dom';


  const QuizComponent = (props)=>{
     
    const qid= props.qid;
    const {user}= isAuthenticated()
    const [quiz, setquiz] = useState({
        title:"",
        subject:"",
        questions:[],
        endtime:"",
        duration:"",
        start:""
      })
      const [refresh, setrefresh] = useState(true)

      useEffect(()=>{
        if(localStorage.getItem("attemptedquiz") && (localStorage.getItem("attemptedquiz") == quiz._id))
            props.history.push("/quiz") 
    },[props.history, quiz._id, refresh])

      const [showP] = useState(true)
    const loadQuiz=()=>{
        // setrefresh(!refresh)
        // if(!localStorage.getItem("attemptedquiz"))
        getQuestions(qid).then(data=>{
          if(data){
            if(data.error){
            //   console.log(data.error)
            }
            else{
              setquiz(data.data[0])
              
            }
          }
        }) 
    }

    useEffect(() => {
        loadQuiz()
    })
    
    const {duration} = quiz
    
    const {cSelected,onCheckboxBtnClick,finish,setfinish,setc,marks} = props
    const [correct, setcorrect] = useState([])
    const [review, setreview] = useState([])

    const markforreview = (i)=>{
        review.push(i)
        setreview(review)
    }
    const [totalmarks, settotalmarks] = useState(0)
    const [start, setstart] = useState(true)
    const dec = ()=>{
        {quiz.questions.map((x)=>
            {
                var f = 0
                x.options.map((y)=>{
                    if(y.isCorrect === false){
                        {cSelected.map((o) => {
                            if(o === y._id){
                                f=1;
                            }
                        })}
                    }
                    else{
                        var t=0
                        {cSelected.map((o) => {
                            if(o === y._id){
                                t=1;
                            }
                        })}
                        if(t===0){
                            f=1
                        }
                    }
                })
                if(f===0){
                    correct.push(true)
                    setcorrect([...correct])
                }
                else{
                    f=0
                }
            })}
            return correct.length
    }
    const check = () => {
        
      if( localStorage.getItem("attemptedquiz")){
          console.log("Inside redirect")
          return <Redirect to={'/'} />
          
      }
    }
    const [isBackButtonClicked, setBackbuttonPress] = useState(false);
    const onBackButtonEvent = (e) => {
      e.preventDefault();
      if (!isBackButtonClicked) {
      if (window.confirm("Do you want to go to Test Listing")) {
       
        setBackbuttonPress(true)
        props.history.go('/')
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setBackbuttonPress(false)
      }
    }
  }
    // const {history} = useRouter();
// useEffect(() => {
  
//   window.history.pushState(null, null, window.location.pathname);
//   window.addEventListener('popstate', onBackButtonEvent);

//   //logic for showing popup warning on page refresh
//   window.onbeforeunload = function () {

//     return "are you sure?";
//   };
//   return () => {
//     window.removeEventListener('popstate', onBackButtonEvent);
//   }
// }, [])

    const onSubmit = ()=>{
        const totalMarks = dec()
        settotalmarks(totalMarks)
        createResponse({cSelected,quiz,user,totalMarks},quiz._id,user._id).then(data=>{
            if(data){
                if(data.error){
                    // console.log(data.error)
                }
                else{
                    setfinish(true)
                    setc(0)
                    if(typeof(window)!== undefined){
                        localStorage.setItem("attemptedquiz",quiz._id)
                    }
                    localStorage.removeItem("sec")
                    localStorage.removeItem("min")
                    localStorage.removeItem("start")
                    // setrefresh(false)
                    // check()
                } 
            }
        })
        
    }


    var elements=[];
    for(var i=0;i<quiz.questions.length;i++){
        elements.push(<Col md={2} style={{height:"3em",margin:"0",width:"100%"}} className="no-col"><NumberCard c={i} cSelected={cSelected}></NumberCard></Col>);
    }
      return(
          <React.Fragment>
              {!start ?
              (<React.Fragment>
                  <Card className='text-center p-5'>
                      <CardTitle>Already Attempted!!</CardTitle>
                  </Card>
                  
              </React.Fragment>):
          (<React.Fragment>
              {finish && (<div className="alert alert-success text-center">Submitted!!You Scored:{totalmarks}</div>)}
              <Row>
                  <Col md={8} className="text-center">
                    
                        <div>
                            <h2>{quiz.title}</h2>
                            <h5>{quiz.subject.name}</h5>
                        </div>
                    
                   </Col>
                   <Col md={4} className="text-center align-items-center">
                       
                            <button className="btn" onClick={()=>{onSubmit()}} style={{backgroundColor:"#FA8281",width:"50%",marginTop:"1em"}}>End Quiz</button>
                        
                   </Col>
                </Row>
              <Row>
                  <Col md={8} style={{height:"60vh"}}>
                    <Card style={{height:"100%",overflow:"hidden"}}>
                        <CardBody style={{overflowX:"hidden",overflowY:"auto"}}>
                            
                                
                            {quiz.questions.map((x,i)=>
                            {
                                return(
                                <div key={i}>{i === props.c && (
                                    <React.Fragment>
                                        <Row>
                                            <Col md={12} className="text-center">
                                                <div style={{marginLeft:"3em"}}><span></span>{x.hasImg &&  <ImageHelper id={x._id}></ImageHelper>}</div>
                                                <div style={{marginLeft:"3em"}}>{props.c+1}.{x.title}</div>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{marginTop:"3em"}}>
                                            {x.options.map((y)=>{
                                                var f 
                                                   {cSelected.map((o) => {
                                                       const k = (o === y._id) ? true : f
                                                        f=k //f true => checked
                                                        // setflag(true);
                                                        return(<span></span>)
                                                   })}
                                                return(
                                                    <React.Fragment>
                                                {finish? (
                                                <Col md={10} className="ml-4">
                                                    {f  ? (
                                                        <React.Fragment>
                                                            {y.isCorrect ?
                                                                (<div className="alert alert-success">
                                                                    <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                    <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                                </div>):
                                                                (<div className="alert alert-danger">
                                                                <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                            </div>)}
                                                        </React.Fragment>
                                                    ):(
                                                        <React.Fragment>
                                                            {y.isCorrect ?
                                                                (
                                                            
                                                                    <div className="alert">
                                                                        <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                        <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                                    </div>
                                                                ):
                                                                (<div className="alert">
                                                                <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                            </div>)}
                                                        </React.Fragment>
                                                    )}
                                                </Col>):(
                                                <Col md={10} className="ml-4">
                                                    <div className="alert">
                                                        <Input type="checkbox" onClick={()=>onCheckboxBtnClick(y._id)} defaultChecked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} />
                                                        <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                    </div>
                                                </Col>)}
                                                </React.Fragment>
                                            )})}
                                            
                                        </Row>
                                        {/* <Row style={{marginTop:"3em"}}>
                                            {i!==0 && <Col md={2}><Button onClick={()=>{props.decrement()}}>Previous</Button></Col>}
                                            {i!==(quiz.questions.length-1) && <Col md={2} style={{marginRight:"0px",marginLeft:"auto"}} onClick={()=>{props.increment()}}><Button>Next</Button></Col>}
                                            {(i===(quiz.questions.length-1) && finish === false) && <Col md={4} style={{marginRight:"0px",marginLeft:"auto"}} onClick={onSubmit}><Button>Finish and Submit</Button></Col>}
                                            {(i===(quiz.questions.length-1) && finish ) && <Col md={4} style={{marginRight:"0px",marginLeft:"auto"}} ><Link to='/dashboard'><Button>Go to Dashboard</Button></Link></Col>}
                                        </Row> */}
                                        
                                    </React.Fragment>
                                )}</div>
                            )})}                       
                        </CardBody>
                    </Card>
                  </Col>
                  <Col md={4}>
                      <Row>
                      {quiz.questions.map((x,i)=>
                            {
                                var f ,j
                                return(
                                
                                    <React.Fragment key={i}>
                                        
                                            {x.options.map((y,l) =>{
                                                
                                                {cSelected.map((o) => {
                                                    const g = (o === y._id) ? true : f
                                                    f=g
                                                    // setflag(true);
                                                    return(<span></span>)
                                                })}
                                                
                                            })
                                            }
                                            {review.map((o)=>{
                                                    const g = (o === i) ? true : j
                                                    j=g
                                                    // setflag(true);
                                                    return(<span></span>)
                                                })}
                                            
                                                <React.Fragment>
                                                    {j ?(
                                                        <Col md={2} style={{height:"3em",margin:"0",width:"100%"}} className="no-col">
                                                        <Card style={{height:"2.5em",padding:"0.5em",borderRadius:"0px",backgroundColor:"#F6FF9F"}} className="text-center">
                                                            {i+1}
                                                        </Card>
                                                        </Col>
                                                    ):(
                                                        <React.Fragment>
                                                        {f  ?(
                                                            <Col md={2} xs={2} style={{height:"3em",margin:"0",width:"100%"}} className="no-col">
                                                            <Card style={{height:"2.5em",padding:"0.5em",borderRadius:"0px"}} className="text-center bg-success">
                                                                {i+1}
                                                            </Card>
                                                            </Col>
                                                        ):(
                                                            <Col md={2} xs={2} style={{height:"3em",margin:"0",width:"100%"}} className="no-col">
                                                            <Card style={{height:"2.5em",padding:"0.5em",borderRadius:"0px",width:"100%"}} className="text-center">
                                                                {i+1}
                                                            </Card>
                                                            </Col>
                                                        )}
                                                        </React.Fragment>
                                                    )}
                                                    
                                                </React.Fragment>
                                    </React.Fragment>
                                
                            )})}  
                      </Row>
                      <Row>
                          <Col className="no-col">
                            <Card className="text-center mt-3">
                                {!finish ? (<><CardTitle className="text-center mt-3" style={{color:"grey"}}>Time Left</CardTitle>
                               {!isNaN(parseInt(duration)) && <Timer initialMinute = {parseInt(duration)} initialSeconds = {0} finish={finish} setfinish={setfinish}></Timer>}
                                <CardSubtitle style={{color:"grey"}}>MaxTime: {duration} Mins.</CardSubtitle></>):(
                                    <CardTitle className="text-center mt-3" style={{color:"grey"}}>Thank You!</CardTitle>
                                )}
                            </Card>
                            <Row className="text-center">
                                
                                <Col md={12}>
                                    <button className="btn" onClick={()=>{markforreview(props.c)}} style={{backgroundColor:"#F6FF9F",width:"60%"}}>Mark for Review</button>
                                </Col>
                                {(props.c=== 0) ?(<Col md={6} style={{marginTop:"5px"}}>
                                    <button className="btn" onClick={()=>{props.decrement()}} style={{backgroundColor:"#FA8281",width:"100%"}} disabled>Previous</button>
                                </Col>):(<Col md={6} style={{marginTop:"5px"}}>
                                    <button className="btn" onClick={()=>{props.decrement()}} style={{backgroundColor:"#FA8281",width:"100%"}}>Previous</button>
                                </Col>)}
                                {(props.c=== quiz.questions.length-1) ? (<Col md={6} style={{marginTop:"5px"}}>
                                    <button className="btn" onClick={()=>{props.increment()}} style={{backgroundColor:"#82F78C",width:"100%"}} disabled>Next</button>
                                </Col>):(<Col md={6} style={{marginTop:"5px"}}>
                                    <button className="btn" onClick={()=>{props.increment()}} style={{backgroundColor:"#82F78C",width:"100%"}}>Next</button>
                                </Col>)}
                                
                                
                            </Row>
                          </Col>
                      </Row>
                  </Col>
              </Row>
              
          </React.Fragment>)
          }</React.Fragment>
      )
  }

  export default withRouter(QuizComponent)