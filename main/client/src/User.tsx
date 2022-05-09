import React from 'react';
// import React, { ChangeEvent, FormEvent } from 'react';
import { Component } from 'react';
import './App.css';

import * as PU from "./proto/users";

interface NewUser {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  address: string
}

class CreateUser extends Component {

  state: NewUser = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: ''
  };

  callCreateUser = () => {
    const rpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
    const usersClientImpt = new PU.UsersClientImpl(rpc);

    const req: PU.CreateUserRequest = this.state;
    usersClientImpt.CreateUser(req).then(res => {
      console.log('res'  + res);
      console.log(res);
    })
  }

  handleSubmit = (event: React.FormEvent) =>  {
    console.log('state');
    console.log(this.state);
    this.callCreateUser();
    event.preventDefault();
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    console.log('change')
    console.log(name);

    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });

  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
            <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
        </label>

        <label>
          Last Name:
            <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
        </label>

        <label>
          Mobile Number:
            <input name="mobileNumber" type="text" value={this.state.mobileNumber} onChange={this.handleChange} />
        </label>

        <label>
          Address:
            <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateUser;
