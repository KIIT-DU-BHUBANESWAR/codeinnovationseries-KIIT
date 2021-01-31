import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import UploadAnswer from './UploadAnswer'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Input,
  Table
} from 'reactstrap';
import $ from 'jquery';
import { getAClassroom, classroomUploadAssignment, getAllUSers, deleteAssignment,isAuthenticated } from './helper/index';
import { API } from '../backend';

const AddAssignment = (props)=> {
    const crid = props.id;
    console.log(crid)
    const [values, setValues] = useState({
        name:"",
        type:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        getRedirect: false,
        createdAssignment:"",
        formData:""
    })
    const Month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    const [project, setProject] = useState({
        name: "",
        description: "",
        subject: "",
        error:"",
        members:[],
        doc:[],
        assignment:[],
        assignmentanswers:[],
        success: false
    })
    const refresh1 = true;
    const [refresh, setrefresh] = useState(true)
    const { name,type,price, stock,photo,categories,category,loading,error,getRedirect,createdAssignment,formData} = values;
    const{user, token} = isAuthenticated();

    const preload = () => {
        getAllUSers().then(data=>{
            console.log(data)
            if(data)
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,categories:data, formData: new FormData()});
                console.log(categories);
            }
        })
    }

    useEffect(()=>{
        preload();
    },[refresh1])

    const getClassroom = cid => {
      getAClassroom(cid).then(data=>{
          
            if(data)
            if(data.error)
          {
              console.log(data.error)
              // setValues({...values,error:data.error})
          }
          else{
              setProject({
                  ...project,
                  name: data.name,
                  description: data.description,
                  subject: data.subject,
                  members: data.members,
                  doc:data.doc,
                  assignment: data.assignment,
                  assignmentanswers: data.assignmentanswers,
              });
              setrefresh(false)
          }
      })}

      useEffect (() => {
          getClassroom(crid)
          },[refresh])


    const goBack = () =>(
        
     <div className="mt-5">
         <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Go Back to Home</Link>
     </div>
    );

    const deleteaassignment = catuctId => {
      console.log(catuctId)
    deleteAssignment({cid: crid, did: catuctId}).then(data=>{
        console.log(data)
            if(data)
            if(data.error)
        {
            console.log(data.error)
            // setValues({...values,error:data.error})
        }
        else{
           setrefresh(true)
        }
    })
}

    const successMessage = () =>{
        console.log(createdAssignment)
        return(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: createdAssignment ? "" : "none"}}>
                        Assignment Added to DB.
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
        const handleChange = name=> event =>{
          const v = name === "photo"? event.target.files[0]:event.target.value;
            console.log(name,event.target.files[0]);
          formData.append(name,v,'photo.png');
          formData.append("username", user.name);
          formData.append("userid", user._id);
          formData.append("submission", "");
          for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
           setValues({...values,[name]: v});
           setValues({...values,photo: v});
           console.log(values)
          
      }
      const handleChanger = name => event => {
            const v =event.target.value

            formData.set(name,v)
            setValues({
                ...values, [name]: v
            })
        }
        
        if((values.photo === "")&&(values.name === "")){
          $('.submitA').addClass('hide');
          console.log(values.photo)
      }else{
        $('.submitA').removeClass('hide')
      }
        const Submit = event =>{
            event.preventDefault();
            setValues({...values,error:"",loading: true})
            classroomUploadAssignment(crid,formData)
            .then( data =>{
               
            if(data)
            if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({
                        ...values,
                        name:"",
                        type:"",
                        price:"",
                        stock:"",
                        photo:"",
                        loading:false,
                        createdAssignment: true,
                    })
                    setrefresh(true)
                }
            })
            .catch(()=>{
                console.log("Error in creating Assignment")
            })
        }

    const catForm =() =>(
        <form >
          {isAuthenticated()&&isAuthenticated().user.role === 1?
            <><h2>Upload Assignments</h2>
        <div className="form-group">
          <label className="btn btn-block btn-info">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChanger("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>submission Date</label>
          <input
            type="date"
            onChange={handleChanger("submission")}
            name="photo"
            className="form-control"
            placeholder=""
            // value={name}
          />
        </div>
        {/* <div className="form-group">
          <textarea
            onChange={handleChanger("type")}
            name="photo"
            className="form-control"
            placeholder="type"
            value={type}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChanger("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChanger("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories && 
            categories.map((cat,index)=>(
                <option key={index} value={cat._id}>{cat.name}</option>
            ))
            }
          </select>
        </div> */}
        {/* <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
          />
        </div> */}
        
        <button type="submit" onClick={Submit} className="btn submitA">
          Create Assignment
        </button></>:""}
        
                            <Table>
                                <th>Assignments</th>
                                <th>Uploader</th>
                                <th>Uploaded on</th>
                                <th>Last Date of submission</th>
                                <th>View</th>
                                <th>Answers</th>
                        {(project.assignment === undefined)?"":
                        (project.assignment.map((obj,i)=>{
                            return(
                            // <tr key={i}>
                            
                                <tr key={i}>

                                        <td>{obj.name}</td>
                                        <td>{obj.uploader}</td>
                                        <td>{obj.date.substring(8,10)} {Month[parseInt(obj.date.substring(5,7)-1)]}, {obj.date.substring(0,4)}</td>
                                        <td>{obj.submission.substring(8,10)} {Month[parseInt(obj.submission.substring(5,7)-1)]}, {obj.submission.substring(0,4)}</td>
                                        {/* <CardSubtitle>{obj.subject}</CardSubtitle>
                                        <CardBody>{obj.description}</CardBody> */}
                                        <td><a href={`${API}/classroom/assignment/${obj._id}/${obj.name}`} rel="noopener noreferrer" target="_blank">Open</a>
                                        {isAuthenticated().user.role === 1 ? <i class="fa fa-trash text-orange" style={{cursor:"pointer"}} onClick={()=>{deleteaassignment(obj._id)}} aria-hidden="true"></i>:""}</td>
                                        <td>
                            <>
                        <UploadAnswer id={crid} aid={obj._id} data={project.assignmentanswers} submission={obj.submission}></UploadAnswer>
                        </>
                        </td>
                                </tr>
                                )
                           
                        
                    }))}
                        </Table>
      </form>
    );
  return (
    
            <div class="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {catForm()}
            </div>
       
  );
}

export default AddAssignment;
