import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from './components';
import { Feed, LogIn, Profile, SignUp, Update } from './pages';
import { IUser } from './interfaces';
import * as cookie from 'cookie';


function getCurrentUserFromCookie(): IUser | null {
  const userCookie = cookie.parse(document.cookie).user as string|undefined;
  if (!userCookie) {
    return null;
  }
  try {
    return JSON.parse(userCookie);
  } catch (error) {
    return null;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUserFromCookie());

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            <LogIn onLogIn={setCurrentUser} />
          </Route>
          <Route exact path="/progress">
            {currentUser ?
              (
                <Fragment>
                  <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)} />
                  <Profile currentUser={currentUser} onProfileChange={setCurrentUser} />
                </Fragment>
              ) :
              <Redirect to="/login" />
            }
          </Route>
          <Route exact path="/update">
            {currentUser ?
              (
                <Fragment>
                  <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)} />
                  <Update currentUser={currentUser} onProfileChange={setCurrentUser} />
                </Fragment>
              ) :
              <Redirect to="/login" />
            }
          </Route>
          <Route exact path="/signup">
            <SignUp onSignUp={setCurrentUser} />
          </Route>
          <Route exact path="/">
            <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)}  />
            <Feed />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
