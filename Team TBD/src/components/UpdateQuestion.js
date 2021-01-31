/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { signup1, getAQuestion, updateQuestion } from './helper/index'
import { toast } from 'react-toastify';
const RegisterModal = (props) =>{
    const [values,setValues] = useState([{
        title:"",
        img:"",
        formData:"",
        success: "",
        error:""
    }])
    const {title,img,formData,success,error} = values
    const handleChange = name => event => {
        const v = name === "img"? event.target.files[0]:event.target.value
      
        formData.set(name,v)
        setValues({
            ...values,[name]: event.target.value
        })
        console.log(values)
        if(name === "img")
        formData.set("hasImg",true)
    }
    const [refresh, setrefresh] = useState(true)
    const loadQuestion = ()=>{
        getAQuestion(props.id).then(data=>{
            console.log("backhere")
            if(data){
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setValues({
                        ...values,error: false, title:data.title, formData: new FormData() 
                    });
                }
            }
        })
    }

    useEffect(() => {
        loadQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh])


    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,error: false
        });
        updateQuestion(props.id,formData).then(data=>{
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
                    toast("Question Updated",{type:"success"})
                    console.log("<3")
                }
            }
        })
    }

        
        const signup = () =>(
            <React.Fragment>
                <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="modal-header border-0">
                                <h3>Update Question</h3>
                            </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="modal-body">
                        <div className="login">
                            <form action="#" className="row">
                                <div className="col-12">
                                    <input type="file" className="mb-3" id="signupPhone" accept="image"  placeholder="Enter Image" onChange={handleChange("img")} value={img}></input>
                                </div>
                                <div className="col-12">
                                    <input type="text" className="mb-3" id="signupName"  placeholder="Enter Question" value={title} onChange={handleChange("title")} ></input>
                                </div>
                                
                                <div className="col-12">
                                    <button type="submit" onClick={onSubmit} className="hvr-bounce-to-top mt-3">Update</button>
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
    export default RegisterModal;