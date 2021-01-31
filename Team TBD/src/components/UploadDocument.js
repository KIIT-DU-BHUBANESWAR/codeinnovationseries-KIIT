import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
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
import $ from 'jquery'
import { classroomUploadDocument, getAllUSers,isAuthenticated, getAClassroom, deleteDocument } from './helper/index';
import { API } from '../backend';

const AddDocument = (props)=> {
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
        createdDocument:"",
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
        success: false
    })
    const refresh1 = true;
    const [refresh, setrefresh] = useState(true)
    const { name,type,price, stock,photo,categories,category,loading,error,getRedirect,createdDocument,formData} = values;
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
              });
              setrefresh(false)
          }
      })}

      const deleteadocument = catuctId => {
          console.log(catuctId)
        deleteDocument({cid: crid, did: catuctId}).then(data=>{
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

      useEffect (() => {
          getClassroom(crid)
          },[refresh])


    const goBack = () =>(
        
     <div className="mt-5">
         <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Go Back to Home</Link>
     </div>
    );

    const successMessage = () =>{

        return(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: createdDocument ? "" : "none"}}>
                        Document Added to DB.
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

            formData.append(name,v,'photo.png');
            formData.append("username", user.name);
            formData.append("userid", user._id);
            for (var key of formData.entries()) {
              console.log(key[0] + ', ' + key[1])
            }
           setValues({...values,[name]: v});

          
      }
      const handleChanger = name => event => {
            const v =event.target.value

            formData.set(name,v)
            setValues({
                ...values, [name]: v
            })
        }
        
        if((values.photo === "")&&(values.name === "")){
            $('.submitD').addClass('hide');
        }else{
            $('.submitD').removeClass('hide')
          }

        const Submit = event =>{
            event.preventDefault();
            setValues({...values,error:"",loading: true})
            classroomUploadDocument(crid,formData)
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
                        createdDocument: true,
                    })
                    setrefresh(true)
                }
            })
            .catch(()=>{
                console.log("Error in creating Document")
            })
        }

        const generateDownload = (id)=>{
        const document =  `${API}/classroom/document/${id}`
        // const previewUrl = window.URL.createObjectURL(document);

        // const anchor = document.createElement.bind("a");
        // anchor.download = "abc.pdf";
        // anchor.href = URL.createObjectURL(document);
        // anchor.click();
            // console.log(anchor)
        // window.URL.revokeObjectURL(previewUrl);
        }

    const catForm =() =>(
        <form >
          {
            isAuthenticated() 
            && isAuthenticated().user.role === 1
            // && isAuthenticated().user.role === 0
            ?<><h2>Upload Notes</h2>
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
        
        <button type="submit" onClick={Submit} className="btn submitD">
          Create Document
        </button></>:""}
        
                            <Table>
                                <th>Notes</th>
                                <th>Uploader</th>
                                <th>Date</th>
                        {(project.doc === undefined)? "" :
                        (project.doc.map((obj,i)=>{
                            return(
                            // <tr key={i}>
                            
                                <tr key={i}>

                                        <td>{obj.name}</td>
                                        <td>{obj.uploader}</td>
                                        <td>{obj.date.substring(8,10)} {Month[parseInt(obj.date.substring(5,7)-1)]}, {obj.date.substring(0,4)}</td>
                                        {/* <CardSubtitle>{obj.subject}</CardSubtitle>
                                        <CardBody>{obj.description}</CardBody> */}
                                
                                        <td><a href={`${API}/classroom/document/${obj._id}/${obj.name}`} rel="noopener noreferrer" target="_blank">Open</a>
                                        {isAuthenticated().user.role === 1 ? <i class="fa fa-trash text-orange" style={{cursor:"pointer"}} onClick={()=>{deleteadocument(obj._id)}} aria-hidden="true"></i>:""}</td>

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

export default AddDocument;
