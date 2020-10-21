import React, { useEffect } from 'react';
import logo from './logo.svg';
import EmailComponent from './components/email/index'
import PasswordComponent from './components/password/index'
import PostComponent from './components/posts/index'
import './App.css';
import {setAuthToken} from './utils/token'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { initDB } from 'react-indexed-db';
import { DBConfig } from './DBConfig';

initDB(DBConfig)

function App() {
  if (localStorage.emailToken) {
    setAuthToken(localStorage.emailToken)
  }
  useEffect(()=>{
   
  },[])

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={EmailComponent}></Route>
        <Route exact path="/email" component={EmailComponent}></Route>
        <Route exact path="/password" component={PasswordComponent}></Route>        
        <Route exact path="/posts" component={PostComponent}></Route>        
      </Router>
    </div>
  );
}

export default App;
