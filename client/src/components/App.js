import React, { useState, useEffect } from "react";
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

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  console.log("current user in app.js ", currentUser)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
      <Route exact path="/">
        <Midi user={currentUser} />
       </Route>
        <Route exact path="/chords/:id" component={ProgressionShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
