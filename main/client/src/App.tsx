import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { GetUser, CreateUser, ListUsers } from './Users';
import { CreateBookings, GetBooking } from './Bookings';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/users">List Users</Link></li>
              <li><Link to="/users/create">Create User</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/users" element={<ListUsers/>}/>
            <Route path="/users/create" element={<CreateUser/>} />
            <Route path="/bookings/:userId" element={<GetUser/>} />
            <Route path="/bookings/:userId/create" element={<CreateBookings/>} />
            <Route path="/bookings/:userId/:bookingId" element={<GetBooking/>} />
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <h2>Home</h2>
    );
  }
}

export default App;
