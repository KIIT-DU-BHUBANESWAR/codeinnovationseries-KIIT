/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Tooltip,
    Button,
    Input,
    Container,
    Form,
    FormGroup,
    Label,
    Spinner,
    Row,
    Col
} from 'reactstrap';
import { isAuthenticated, getAUser, updateUser } from '../../../helper';
import { useEffect } from 'react';

const TooltipItem = props => {
    const { item, id } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
   



    return (
        <span>
            <Button className="mr-1" color="secondary" id={"Tooltip-" + id}>
                {item.text}
            </Button>
            <Tooltip
                placement={item.placement}
                isOpen={tooltipOpen}
                target={"Tooltip-" + id}
                toggle={toggle}
            >
                Tooltip Content!
      </Tooltip>
        </span>
    );
};

const TooltipComponent = () => {

    const [classLink, setclassLink] = useState()
    const {user,token} = isAuthenticated()
    
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [star, setStar] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);


    const [guser, setguser] = useState({
        name: "",
        email: "",
        mob: "",
        proPic:""
    })

    const getUser = () =>{

        getAUser(user._id,token).then(data=>{
            console.log(data)
            if(data)
            if(data.error){
                console.log(data.error);
            }
            else{
                setguser({
                    ...guser,
                    name: data.name,
                    email: data.email,
                    mob: data.mob
                })
            }
        }).catch(err=>
            console.log(err)
        )
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleChange = name => event => {
        setguser({
            ...guser, [name]: event.target.value
        })
    }
    const handleSubmit = ()=>{
    const {user,token} = isAuthenticated()

        updateUser(user._id,token,guser).then(data=>{
            if(data)
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log("user updated")
            }
        })
    }
    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <Card>
                <CardTitle className="bg-light border-bottom p-3 mb-0">
                    <i className="mdi mdi-image-filter-vintage mr-2"> </i>
                    Tooltip
                </CardTitle>
                <CardBody className="">
                <Container fluid className="mt-5">
      <Row>
        <Col md="6" className="offset-md-3 p-2">
          <Form onSubmit={handleChange}>
            <div className="text-center">
              {isUploading ? (
                <Spinner type="grow" color="primary" />
              ) : (
                <div>
                  <label htmlFor="imagepicker" className="">
                    <img src={downloadUrl} alt="" className="profile" />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={guser.name}
                onChange={handleChange("name")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                value={guser.email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="number"
                id="phonenumber"
                value={guser.mob}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="Contact number"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                name="area"
                id="area"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="address"
              />
            </FormGroup>

            <Button
              type="submit"
              block
              className="text-uppercase"
            >
             Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
                </CardBody>
            </Card>
            {/* -------------------------------------------------------------------------------- */}
            {/* Row */}
            {/* -------------------------------------------------------------------------------- */}
        </div>
    );
}

export default TooltipComponent;
