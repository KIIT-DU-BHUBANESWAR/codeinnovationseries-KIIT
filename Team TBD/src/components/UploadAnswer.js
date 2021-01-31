import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
  Table
} from 'reactstrap';
import $ from 'jquery'
import { classroomUploadAnswer, getAllUSers,isAuthenticated } from './helper/index';
import { API } from '../backend';

const UploadAnswer = (props)=> {
    const crid = props.id;
    const aid = props.aid;
    const data = props.data;
    console.log(crid)
    const [values, setValues] = useState({
        name:"",
        type:"",
        price:"",
        a_id:aid,
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

   
    const refresh1 = true;
    const [, setrefresh] = useState(true)
    const { name,categories,error,createdDocument,formData} = values;
    const{user} = isAuthenticated();

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

    
     

    const successMessage = () =>{

        return(
        <div className="row ">
                <div className="col-md-8 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: createdDocument ? "" : "none"}}>
                        Answer Submitted.
                    </div>
                </div>
        </div>
    )}

    const errorMessage = () =>{
       
    return(
        <div className="row ">
        <div className="col-md-8 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
        </div>
        </div>
    )}
        const handleChange = name=> event =>{
          const v = name === "photo"? event.target.files[0]:event.target.value;

            formData.append(name,v,'photo.png');
            formData.append("assignment", aid);
            formData.append("username", user.name);
            formData.append("userid", user._id);
            
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
            classroomUploadAnswer(crid,formData)
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
                        a_id:"",
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

    const catForm =() =>(
        <form >
          {
            isAuthenticated().user.role === 0
            ?<>
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
        </button></>:<>
        <Table>
                                <th>Answers</th>
                                <th>Uploaded By</th>
                                <th>Date</th>
                        {(data === undefined)? "" :
                        (data.map((obj,i)=>{
                            if(obj.qid.toString() === aid.toString()){
                            return(
                            // <tr key={i}>
                            
                                <tr key={i}>

                                        <td>{obj.name}</td>
                                        <td>{obj.uploader}</td>
                                        <td>{obj.date.substring(8,10)} {Month[parseInt(obj.date.substring(5,7)-1)]}, {obj.date.substring(0,4)}</td>
                                        <td><a href={`${API}/classroom/answer/${obj._id}/${obj.name}`} rel="noopener noreferrer" target="_blank">Open</a></td>
                                </tr>)}}))}</Table>
        </>}
{/*         
                            <Table>
                                <th>Notes</th>
                                <th>Date</th>
                        {(project.doc === undefined)? "" :
                        (project.doc.map((obj,i)=>{
                            return(
                            // <tr key={i}>
                            
                                <tr key={i}>

                                        <td>{obj.name}</td>
                                        <td>{obj.date.substring(8,10)} {Month[parseInt(obj.date.substring(5,7)-1)]}, {obj.date.substring(0,4)}</td>

                                </tr>
                                )
                           
                        
                    }))}
                        </Table> */}
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

export default UploadAnswer;
