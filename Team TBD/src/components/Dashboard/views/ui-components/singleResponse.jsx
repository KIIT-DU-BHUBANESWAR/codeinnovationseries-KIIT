/* eslint-disable no-lone-blocks */
import React, {useState,useEffect} from 'react';
import { getQuestions2,createResponse,isAuthenticated } from '../../../helper/index';

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

  const QuizComponent = (props)=>{
     
    const qid= props.match.params.quiz;
    const rid= props.match.params.response;
    // console.log(props,qid)
    const {user}= isAuthenticated()
    const [quiz, setquiz] = useState({
        title:"",
        subject:"",
        questions:[{
            options:[]
        }],
        responses:[{
            response:[]
        }],
        endtime:"",
        duration:"",
        start:""
      })
    
      const [showP] = useState(true)
    const loadQuiz= async ()=>{
        // var id='/start/quiz'
        getQuestions2(qid).then(data=>{
          if(data){
            if(data.error){
            //   console.log(data.error)
            }
            else{
              setquiz(data.data[0])
            //   console.log(quiz)
            }
          }
        }) 
    }

    useEffect(() => {
        loadQuiz()
    })

    
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
          <React.Fragment>
              {finish === true && (<div className="alert alert-success text-center">Submitted!!You Scored:{totalmarks}</div>)}
              <Row>
                   <Col md={12} style={{}}>
                    <Card style={{height:"100%"}}>
                        <CardBody>
                            
                            {quiz.responses.map((p,k)=>{
                                // console.log(p,"p")
                                return(
                                    <React.Fragment>
                                        {(p._id === rid) && quiz.questions.map((x,i)=>
                            {
                                return(
                                <div key={i}>
                                    <React.Fragment>
                                        <Row>
                                            <Col md={12} className="text-center">
                                                <div style={{marginLeft:"3em"}}>{i+1}.{x.title}</div>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{marginTop:"3em"}}>
                                            {x.options.map((y,l)=>{
                                                // console.log(p.response[l])
                                                var f 
                                                //    {cSelected.map((o) => {
                                                //        const k = (o === y._id) ? true : f
                                                //         f=k
                                                //         // setflag(true);
                                                //         return(<span></span>)
                                                //    })}
                                                return(
                                                    <React.Fragment>
                                                <Col md={6} className="text-center">
                                                    
                                                        <React.Fragment>
                                                            {y._id === p.response[l]._id ? ( y.isCorrect === true ?
                                                                (<div className="alert alert-success">
                                                                    <input type="checkbox" checked={true} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                    <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                                </div>):
                                                                (
                                                                    <div className="alert alert-danger">
                                                                        <input type="checkbox" checked={true} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                        <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                                    </div>
                                                                )):(y.isCorrect === true ?
                                                                (<div className="alert alert-success">
                                                                    <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                    <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                                </div>):
                                                                (<div className="alert">
                                                                <input type="checkbox" checked={f} aria-label="Checkbox for following text input" style={{marginTop:"4px"}} disabled/>
                                                                <span style={{marginLeft:"6px"}}>{y.optionValue}</span>
                                                            </div>))}
                                                        </React.Fragment>
                                                    
                                                </Col>
                                                </React.Fragment>
                                            )})}
                                            
                                        </Row>
                                        
                                    </React.Fragment>
                                </div>
                            )})}
                                    </React.Fragment>
                                )
                            })} 
                                                   
                        </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>

                </Row>
              
              
          </React.Fragment>
          </React.Fragment>
      )
  }

  export default QuizComponent