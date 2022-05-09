import React from 'react';
// import React, { ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import User from './User';
import { GetUser, ListUsers } from './Users';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/users">List Users</Link></li>
              <li><Link to="/users/create">Create Users</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/users" element={<ListUsers/>}/>
            <Route path="/users/create" element={<User/>} />
            <Route path="/users/:userId" element={<GetUser/>} />
            <Route path="/" element={<Home/>}/>
          </Routes>

        </div>
      </Router>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <h2>Home</h2>
    );
  }
}

export default App;
