import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as PU from "./proto/users";

class App extends Component {

  callCreateUser = () => {
    // const client = new PU.UsersClient('http://localhost:7000', credentials.createInsecure());

    const rpc = new PU.GrpcWebImpl('http://localhost:7000', {
      debug: false,
    });
    const a = new PU.UsersClientImpl(rpc);
    const req: PU.CreateUserRequest = {
      firstName: 'test',
      lastName: 'last name',
      mobileNumber: '09196105668',
      address: 'hogwarts'
    }
    a.CreateUser(req).then(res => {
      console.log('res'  + res);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button style={{padding:10}} onClick={this.callCreateUser}>Click for grpc request</button>
        </header>
      </div>
    );
  }
}

export default App;
