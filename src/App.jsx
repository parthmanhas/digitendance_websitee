import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DashBoard from './components/DashBoard';
import FirebaseContext from './components/Firebase/firebaseContext';
import AllLectures from './components/SignedInLinks/AllLectures';
import AllQuiz from './components/SignedInLinks/AllQuiz';
import AllWorkshop from './components/SignedInLinks/AllWorkshop';
import AllTest from './components/SignedInLinks/AllTest';
import LectureDates from './components/SignedInLinks/LectureDates';
import LectureAttendance from './components/SignedInLinks/LectureAttendance';
import AllClasses from './components/SignedInLinks/AllClasses';
import QuizAttendance from './components/SignedInLinks/QuizAttendance';
import QuizDates from './components/SignedInLinks/QuizDates';
import TestDates from './components/SignedInLinks/TestDates';
import TestAttendance from './components/SignedInLinks/TestAttendance';
import WorkshopAttendance from './components/SignedInLinks/WorkshopAttendance';
import WorkshopDates from './components/SignedInLinks/WorkshopDates';
import Class from './components/SignedInLinks/Class';
import Test from './components/Test';
import DatesTest from './components/DatesTest';
import AddClass from './components/SignedInLinks/AddClass';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    document.title = "Digitendance";
  }, [])
  
  if (loggedIn) {
    return (
      <FirebaseContext.Consumer>
        {firebase =>
          <div className="App">
            <Router>
              <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              <Switch>
                <Route path='/dashboard' component={DashBoard} />
                <Route path='/allClasses' component={AllClasses} />
                <Route path='/allLectures' component={AllLectures} />
                <Route path='/allQuiz' component={AllQuiz} />
                <Route path='/allTest' component={AllTest} />
                <Route path='/allWorkshop' component={AllWorkshop} />
                <Route path='/lecturesDates' component={LectureDates} />
                <Route path='/lectureAttendance' component={LectureAttendance} />
                <Route path='/quizAttendance' component={QuizAttendance} />
                <Route path='/quizDates' component={QuizDates} />
                <Route path='/testDates' component={TestDates} />
                <Route path='/testAttendance' component={TestAttendance} />
                <Route path='/workshopAttendance' component={WorkshopAttendance} />
                <Route path='/workshopDates' component={WorkshopDates} />
                <Route path='/class' component={Class} />
                <Route path='/addClass' component={AddClass} />
              </Switch>
            </Router>
          </div>
        }
      </FirebaseContext.Consumer >
    );
  }
  else {
    return (
      <FirebaseContext.Consumer>
        {firebase =>
          <div className="App">
            <Router>
              <Navbar loggedIn={loggedIn} />
              <Switch>
                <Redirect exact from="/" to="/signin" />
                <Route path='/signin' component={() => <SignIn setLoggedIn={setLoggedIn} />} />
                <Route path='/signup' component={() => <SignUp />} />
                <Route exact path='/test' component={Test} />
                <Route exact path='/testDates' component={DatesTest} />
              </Switch>
            </Router>
          </div>
        }
      </FirebaseContext.Consumer >
    );
  }

}

export default App;
