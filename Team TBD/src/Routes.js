/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Contact from './components/Contact';
import Fulllayout from './components/Dashboard/layouts/fulllayout';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import About from './components/AboutPage';
import Question from './components/Question';
import CoursePage from './components/CoursePage';
import NoticePage from './components/NoticePage';
import FulllayoutTeacher from './components/Dashboard/layouts/fulllayout -teacher';
import FulllayoutAdmin from './components/Dashboard/layouts/fulllayout -admin';
import preloader from './images/preload.gif';
import Quiz from './components/Dashboard/views/ui-components/quizstudent';
import PrivateRoute from './auth-routes/PrivateRoutes';
import TeacherRoute from './auth-routes/TeacherRoutes';
import AdminRoute from './auth-routes/AdminRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Routes() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);
  });
  return (
    <BrowserRouter>
      {/* <header className="fixed-top header">
                <TopHeader></TopHeader>
                <Navbar ></Navbar>
          </header> */}
      {loading ? (
        <div className="preloader">
          <img src={preloader} alt="Loading..."></img>
        </div>
      ) : (
        <>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/dashboard" component={Fulllayout} />
            <PrivateRoute exact path="/quiz" component={Fulllayout} />
            <PrivateRoute exact path="/classroom" component={Fulllayout} />
            <PrivateRoute exact path="/material" component={Fulllayout} />
            <PrivateRoute exact path="/settings" component={Fulllayout} />
            <PrivateRoute exact path="/start/quiz/:question" component={Quiz} />
            <PrivateRoute exact path="/quizcompleted" component={Fulllayout} />
            <TeacherRoute
              exact
              path="/dashboard-teacher"
              component={FulllayoutTeacher}
            />
            <TeacherRoute
              exact
              path="/listclassroom"
              component={FulllayoutTeacher}
            />
            <TeacherRoute
              exact
              path="/view/response/:quiz/:response"
              component={FulllayoutTeacher}
            />
            <TeacherRoute
              exact
              path="/quiz/:user"
              component={FulllayoutTeacher}
            />
            <TeacherRoute
              exact
              path="/responses/:question"
              component={FulllayoutTeacher}
            />
            <AdminRoute
              exact
              path="/dashboard-admin"
              component={FulllayoutAdmin}
            />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/course" component={CoursePage} />
            <Route exact path="/notice" component={NoticePage} />
            <Route exact path="/myclassroom/:handle" component={Fulllayout} />

            <Route
              exact
              path="/teacherClassroom/:handle"
              component={FulllayoutTeacher}
            />
          </Switch>
        </>
      )}
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default Routes;
