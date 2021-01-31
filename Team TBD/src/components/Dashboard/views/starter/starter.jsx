import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';
import { SalesSummary, Projects, Feeds } from '../../components/dashboard-components';
import { toast } from 'react-toastify';
import img1 from '../../assets/images/big/img1.jpg';
import img2 from '../../assets/images/big/img2.jpg';
import img3 from '../../assets/images/big/img3.jpg';

const Starter = () => {
    return (
        <div className="mt-4">
            <Row>
                <Col sm={6} lg={7}>
                    <SalesSummary />
                </Col>
                <Col sm={6} lg={5} >
                    <Feeds />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Projects />
                </Col>
            </Row>
        </div>
    );
}

export default Starter;
