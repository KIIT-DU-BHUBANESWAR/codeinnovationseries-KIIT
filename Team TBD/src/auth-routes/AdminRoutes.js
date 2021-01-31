import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated } from '../components/helper'

const AdminRoute= ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.role === 2 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute