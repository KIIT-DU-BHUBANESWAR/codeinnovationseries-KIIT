/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
  Table,
} from 'reactstrap';
import $ from 'jquery';
import TopHeader from './TopHeader.js';
import Navbar from './Navbar';

import { isAuthenticated } from './helper/index';

const QuizQuestion = (props) => {
  const qid = props.match.params.question;
  console.log(qid);

  return (
    <React.Fragment>
      <header className='sticky-top header'>
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar></Navbar>
      </header>
      {/* <!-- /header --> */}
    </React.Fragment>
  );
};
export default QuizQuestion;
