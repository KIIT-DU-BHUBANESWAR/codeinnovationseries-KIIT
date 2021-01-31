
import React,{useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Table} from 'reactstrap';
import {getQuestions, deleteQuestion, deleteOption} from '../../../helper';
import { Link } from 'react-router-dom';


const Questions = (props) => {

    const qid= props.location.pathname;

    const [quiz, setquiz] = useState({
      title:"",
      subject:"",
      questions:[],
      responses:[],
      endtime:"",
      start:""
    })
    const [qarray, setqarray] = useState([{
      title: "",
      img:"",
      hasImg:false,
      formData:""
  }])


    const loadQuiz=()=>{
        // console.log(qid,"id")

        getQuestions(qid).then(data=>{
          if(data){
            if(data.error){
            //   console.log(data.error)
            }
            else{
              setquiz(data.data[0])
              console.log("see",data)
              setqarray({
                ...qarray, formData: new FormData()
              })
             
            }
          }
        })

         
    }


    const [refresh, setrefresh] = useState(true)

    useEffect(() => {
        loadQuiz()
    }, [refresh])
  const [, setzId] = useState()
  const [, setshow] = useState(false);
  const [, setoId] = useState()
  const [, setshowo] = useState(false);



 
console.log(quiz.responses)
    return(
    <React.Fragment>
          <div >
            <Row>
                 <Col xs="12" md="12">
                  <Card>
                    <CardBody>
                      <Table>
                        <thead>
                            <th>Name</th>
                            <th>Marks Obtained</th>
                            <th>Date Submitted</th>
                        </thead>
                        <tbody>
                          {quiz.responses.map((x,i)=>(
                            <tr>
                              {/* {console.log(x,"hh")} */}
                              
                            {/* <React.Fragment>
                              <div className="row"> */}
                              <td>
                              <span className="col-11">{i+1}. {x.student.name}</span>
                             </td> 
                             <td>
                              <span className="col-11">{x.totalMarks}</span>
                              </td>
                              <td><Link to={`/view/response/${x.quizId}/${x._id}`}> Start </Link></td>
                            {/* </div>
                            </React.Fragment> */}
                            
                            </tr>
                          ))}
                          </tbody>
                       </Table>
                    </CardBody>
                  </Card>
                </Col>
            </Row>
          </div>
          
    </React.Fragment>)
}
export default Questions;