import React, {useState,useEffect} from 'react';

import QuizComponent from './quizComponent';
import { Redirect, withRouter,useHistory,useRouter } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'

  const QuizStudent = (props)=>{
      const [c, setc] = useState(0)
      const [finish, setfinish] = useState(false)
      // const {check}=props
      // useEffect(() => {
      //   if(check===true){
      //     setfinish(true)
      //   }
      //   else{
      //     setfinish(false)
      //   }
      // }, [check])
    const qid= props.location.pathname;
      const increment = ()=>{
        setc(c+1)
      }
      const decrement = ()=>{
        setc(c-1)
      }
      var elements=[];
      const [cSelected, setCSelected] = useState([]);
      const [marks, setmarks] = useState(0)
      const onCheckboxBtnClick = (selected) => {
          
          const index = cSelected.indexOf(selected);
          if (index < 0) {
          cSelected.push(selected);
          } else {
          cSelected.splice(index, 1);
          }
          setCSelected([...cSelected]);
          console.log(cSelected,"oncheck")
      }
      const incMarks = ()=>{
        setmarks(marks+1)
      }
      
  //     const [isBackButtonClicked, setBackbuttonPress] = useState(false);
  //     const onBackButtonEvent = (e) => {
  //       localStorage.setItem("jj",7)
  //       e.preventDefault();
  //       if (!isBackButtonClicked) {
  //         localStorage.removeItem("start")
  //       if (window.confirm("Do you want to go to Test Listing")) {
  //         localStorage.removeItem("start")
  //         setBackbuttonPress(true)
  //         console.log("here")
  //         props.history.go('/')
  //       } else {
  //         window.history.pushState(null, null, window.location.pathname);
  //         setBackbuttonPress(false)
  //       }
  //     }
  //   }
  //     // const {history} = useRouter();
  // useEffect(() => {
    
  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener('popstate', onBackButtonEvent);

  //   //logic for showing popup warning on page refresh
  //   window.onbeforeunload = function () {

  //     return "Data will be lost if you leave the page, are you sure?";
  //   };
  //   return () => {
  //     window.removeEventListener('popstate', onBackButtonEvent);
  //   }
  // }, [])

      // const [refresh, setrefresh] = useState(true)
      // const check = () => {
      //   console.log(localStorage.getItem("attemptedquiz"),"c p")
      //   if(localStorage.getItem("attemptedquiz")){
      //     console.log("Inside Parent")
      //       return(
      //           <Redirect to={{
      //             pathname: "/dashboard",
      //             // search: "?utm=your+face",
      //             // state: { referrer: currentLocation }
      //           }}></Redirect>
      //       )
      //   }
      // }
  
      // useEffect(()=>{
      //     check()
      // })
    //       useEffect(()=>{
      
    // },[finish])
      return(
    <QuizComponent c={c} setc={setc} increment={increment} decrement={decrement} qid={qid} cSelected={cSelected} finish={finish} setfinish={setfinish} elements={elements} onCheckboxBtnClick={onCheckboxBtnClick} marks={marks} incMarks={incMarks} setmarks={setmarks}></QuizComponent>
      )
  }

  export default withRouter(QuizStudent)