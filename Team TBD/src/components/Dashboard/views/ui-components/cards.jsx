import React from 'react';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink,
    Button,
    Row,
    Col
} from 'reactstrap';


import ReactPlayer from "react-player";

const Cards = () => {
    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <h5 className="mb-3">Videos</h5>
            <Row>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardBody>
                            <CardTitle>Topic</CardTitle>
                            <CardSubtitle>Description</CardSubtitle>
                        </CardBody>
                        <ReactPlayer width="100%" height="12em"
                                url="https://www.youtube.com/watch?v=ug50zmP9I7s"
                            />
                        <CardBody>
                            <CardLink href="#">Open in new tab</CardLink>
                            <CardLink href="#">Save</CardLink>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardBody>
                            <CardTitle>Topic</CardTitle>
                            <CardSubtitle>Description</CardSubtitle>
                        </CardBody>
                        <ReactPlayer width="100%" height="12em"
                                url="https://www.youtube.com/watch?v=ug50zmP9I7s"
                            />
                        <CardBody>
                            <CardLink href="#">Open in new tab</CardLink>
                            <CardLink href="#">Save</CardLink>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardBody>
                            <CardTitle>Topic</CardTitle>
                            <CardSubtitle>Description</CardSubtitle>
                        </CardBody>
                        <ReactPlayer width="100%" height="12em"
                                url="https://www.youtube.com/watch?v=ug50zmP9I7s"
                            />
                        <CardBody>
                            <CardLink href="#">Open in new tab</CardLink>
                            <CardLink href="#">Save</CardLink>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
            <h5 className="mb-3">Documents</h5>
            <Row>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body className="text-center">
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body className="text-right">
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                </Col>
            </Row>
            
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* End Inner Div*/}
            {/* --------------------------------------------------------------------------------*/}
        </div>
    );
}

export default Cards;


