/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { signup1, getAOption, updateOption} from './helper/index'
import { InputGroup,InputGroupAddon,InputGroupText,Input } from 'reactstrap'

import { toast } from 'react-toastify';
const UpdateOption = (props) =>{
    const [values,setValues] = useState([{
        optionValue:"",
        isCorrect:"",
        success: "",
        error:""
    }])

    const {optionValue,isCorrect,success,error} = values
    const handleChange = name => event => {
        if(name === "isCorrect")
        setValues({
            ...values,[name]: !isCorrect
        })
        else
        setValues({
            ...values,[name]: event.target.value
        })
    }
    const [refresh1, setrefresh1] = useState(true)
    const loadOption = ()=>{
        getAOption(props.id).then(data=>{
            console.log("backhere")
            if(data){
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setValues({
                        ...values,error: false, optionValue:data.optionValue,isCorrect:data.isCorrect
                    });
                }
            }
        })
    }

    useEffect(() => {
        loadOption()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh1])

    const successMessage = () =>{
        
        return(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Option Updated!!
                    </div>
                </div>
        </div>
    )}

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
    const { loadrefresh,hide } = props
    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,error: false
        });
        updateOption(props.id,values).then(data=>{
            if(data){
                if(data.error)
                {
                    toast(data.error,{type:"error"})
                    console.log(data.error)
                    setValues({
                        ...values, 
                    });
                }
                else{
                    toast("Option Updated",{type:"success"})
                    console.log("<3")
                    loadrefresh()
                    hide()
                }
            }
        })
    }

        
        const signup = () =>(
            <React.Fragment>
                <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="modal-header border-0">
                                <h3>Update Option</h3>
                            </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="modal-body">
                        <div className="login">
                            <form action="#" className="row">
                                              <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <Input addon type="checkbox" id="hi" name="isCorrect" onChange={handleChange("isCorrect")} checked={isCorrect} aria-label="Checkbox for following text input" />
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Enter Option" name="optionValue" onChange={handleChange("optionValue")} value={optionValue}/>
                                              </InputGroup>
                                              
                                
                                <div className="col-12 d-flex flex-row-reverse mt-3">
                                    <button onClick={onSubmit} style={{margin:"auto"}} className="btn btn-outline-success">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </React.Fragment>
        )
    return(
        <React.Fragment>
            {signup()}
            {/* <p class="text-success text-center">j{JSON.stringify(values)}</p> */}
        </React.Fragment>
        )
    };
    export default UpdateOption;