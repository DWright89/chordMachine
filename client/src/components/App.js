import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";
import Midi from "./music/Midi.js"
import ProgressionShow from "./music/ProgressionShow.js";
import IndexPage from "./music/IndexPage.js";
import LandingPage from "./music/LandingPage.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false)

  const fetchCurrentUser = async () => {
    setLoading(true)
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setLoading(false)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])


  return (
    <Router>
        <TopBar user={currentUser} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <AuthenticatedRoute
            exact={true}
            path="/chords/new"
            component={Midi}
            user={currentUser}
          />
          <AuthenticatedRoute
            exact={true}
            path="/all"
            component={IndexPage}
            user={currentUser}
          />
          <AuthenticatedRoute
            exact={true}
            path="/chords/:id"
            component={ProgressionShow}
            user={currentUser}
          />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </Switch>
    </Router>
  );
};

export default hot(App);
