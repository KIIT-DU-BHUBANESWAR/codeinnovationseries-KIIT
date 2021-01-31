/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { signup1,getAllStandards } from './helper/index'
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
const RegisterModal = () =>{
    const [values,setValues] = useState({
        name:"",
        mob:"",
        email:"",
        password:"",
        standard:"",
        error:"",
        success: false
    })

    const {name, mob,email, password,standard, error, success} = values;

    const handleChange = name => event => {
        setValues({
            ...values,error: false, [name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,error: false
        });
        signup1({name,email,password,mob})
            .then( (data) =>{
                if(data){
                if(data.error){
                    toast(data.error,{type:"error"})
                    setValues({
                        ...values,
                        success: false
                    })
                }
                else{
                    toast("Registered!!",{type:"success"})
                    setValues({
                        ...values,
                        name:"",
                        mob:"",
                        email:"",
                        password:"",
                        standard:"", 
                        error:""
                    })
                }
            }
            })
            .catch(console.log("Error in signup"))
    }

    const successMessage = () =>(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Congratulations!!!You are registered with us. Start now{" "}<Link to="/signin">here</Link>
                    </div>
                </div>
        </div>
    )

    const errorMessage = () =>{
       
    return(
        <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
        </div>
        </div>
    )}
    
    const [std, setstandard] = useState([])
    const [errorS, seterrorS] = useState(false)
    const loadAllStandards = () =>{
        getAllStandards().then(data =>{
          //   console.log(data)
          if(data)
          if(data.error){
            seterrorS(data.error)
          }
          else{
            setstandard(data)
          }
        })
      }
      useEffect (() => {
        loadAllStandards()
        },[])
        
        const signup = () =>(
            <React.Fragment>
                <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="modal-header border-0">
                                <h3>Register</h3>
                            </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="modal-body">
                        <div className="login">
                            <form action="#" className="row">
                                <div className="col-12">
                                    <input type="text" className="form-control mb-3" id="signupPhone" name="signupPhone" placeholder="Phone" onChange={handleChange("mob")} value={mob}></input>
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control mb-3" id="signupName" name="signupName" placeholder="Name" onChange={handleChange("name")} value={name}></input>
                                </div>
                                <div className="col-12">
                                    <input type="email" className="form-control mb-3" id="signupEmail" name="signupEmail" placeholder="Email" onChange={handleChange("email")} value={email}></input>
                                </div>
                                <div className="col-12">
                                    <input type="password" className="form-control mb-3" id="signupPassword" name="signupPassword" placeholder="Password" onChange={handleChange("password")} value={password}></input>
                                </div>
                                
                                <div className="col-12">
                                    <button type="submit" onClick={onSubmit} className="hvr-bounce-to-top">SIGN UP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </React.Fragment>
        )
    return(
        <React.Fragment>
             {successMessage()}
            {errorMessage()}
            {signup()}
            {/* <p class="text-success text-center">j{JSON.stringify(values)}</p> */}
        </React.Fragment>
        )
    };
    export default RegisterModal;