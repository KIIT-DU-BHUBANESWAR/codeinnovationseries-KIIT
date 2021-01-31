/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import CartModal from './CartModal';
import { Modal } from 'react-bootstrap';
import {
  isAuthenticated,
  addItemToCart,
  loadCart,
  removeItemFromCart,
  updateItemInCart,
} from './helper';
import { toast } from 'react-toastify';

// if(document.domain === 'localhost'){
//   //development
// }
// else{
//   //production
// }

const CourseItem = (props) => {
  var display = {
    display: `inline-block`,
  };
  const { user, token } = isAuthenticated();
  const [flag, setflag] = useState(0);
  const [amount, setamount] = useState(0);
  const [sub, setsub] = useState(2);
  const [product, setproduct] = useState([
    {
      name: props.topic,
      id: props.subjectid,
      count: 1,
      price: props.price,
      standard: props.standard,
    },
  ]);
  const [cart, setcart] = useState(loadCart());

  const addProductToCart = async () => {
    var i;

    if (cart === undefined) {
      addItemToCart(product, () => {
        setcart(loadCart());
      });
      setcart(loadCart());
    } else {
      for (i = 0; i < cart.length; i++) {
        if (cart[i][0].name === props.topic) {
          updateItemInCart(props.topic);
          i = cart.length;
          break;
        }
        if (i === cart.length - 1) {
          addItemToCart(product);
          break;
        }
      }
    }

    setshowlogin(true);
  };

  const [show, setShow] = useState(false);
  const [showlogin, setshowlogin] = useState(false);

  const handleCloselogin = () => {
    setshowlogin(false);
  };
  console.log(props);
  return (
    <React.Fragment>
      <div className='col-lg-3 p-3 col-sm-6 p-3'>
        <div className='card p-0 hover-shadow course-card-custom '>
          <div className='card-header py-0 pt-2'>
            <h4 className='card-title py-2 course-card-title'>{props.topic}</h4>
            <p className=' '>Class {props.standard}</p>
            {/* <p className=' ribbon-course'>Class {props.standard}</p> */}
            <p className='list-inline-item p-2 px-3 badge text-white bg-primary font-weight-bold rounded'>
              Rs.{props.price}
            </p>
          </div>
          <div className='card-body pt-0'>
            {/* <p className='list-inline-item badge text-white bg-primary font-weight-bold rounded'>
              Rs.{props.price}
            </p> */}
            <hr className='mt-0'></hr>
            <a
              data-toggle='modal'
              data-target='#signinModal'
              className='hvr-bounce-to-top small font-weight-bold'
              topic={props.topic}
              onClick={() => {
                if (user) addProductToCart();
                else {
                  toast('Please Login/Register to continue', {
                    type: 'error',
                  });
                }
              }}
            >
              Enroll
            </a>
          </div>
        </div>
      </div>
      <Modal show={showlogin} onHide={handleCloselogin}>
        <CartModal></CartModal>
      </Modal>
    </React.Fragment>
  );
};

export default CourseItem;
