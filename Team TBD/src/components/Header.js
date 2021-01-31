import React from 'react';
import TopHeader from './TopHeader.js';
import Navbar from './Navbar.js';

const Header = () => {
  return (
    <React.Fragment>
      <header className="sticky-top header">
        {/* <!-- top header --> */}
        <TopHeader></TopHeader>
        {/* <!-- navbar --> */}
        <Navbar></Navbar>
      </header>
      {/* <!-- /header --> */}
    </React.Fragment>
  );
};
export default Header;
