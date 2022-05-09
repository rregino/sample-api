import React from 'react';
import {
  Link,
  useParams,
  Outlet
} from "react-router-dom";
import { callCreateUser, callGetBookings, callGetUser, callListUsers } from './client';
import * as PU from "./proto/users";
import * as PX from "./proto/xpress";

// const usersRpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
// const usersClientImpt = new PU.UsersClientImpl(usersRpc);
// const xpressRpc = new PX.GrpcWebImpl('http://localhost:8080', { debug: false });
// const xpressClientImpt = new PX.XpressClientImpl(xpressRpc);

const ListUsers: React.FC = () => {
  const [users, setUsers] = React.useState<Array<PU.User>>([]);

  React.useEffect(() => {
    callListUsers().then(usersRes => {
      setUsers(usersRes);
    })
  }, []);

  return (
    <div>
      <nav className="list-group">
          {users &&
            users.map((user, index) => (
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/bookings/${user.id}`}
                key={user.id}
              >
                {user.firstName} {user.lastName}
              </Link>
            ))
          }
        </nav>
    </div>
    );
}

const GetUser: React.FC = () => {
  type State = {
    user: PU.User | null,
    bookings: Array<PX.Booking>
  }

  const [state, setState] = React.useState<State>({ user: null, bookings: [] });

  let params = useParams();

  React.useEffect(() => {
    if(params.userId) {
      callGetUser(params.userId).then(userRes => {
        return callGetBookings().then(bookingRes => {
          if(userRes) {
            setState({...state, ...{ user: userRes, bookings: bookingRes }});
          }
        })
      })
    }
  }, []);

  return (<div>
    { state.user ? (
        <div>
          <div>
            Hello { state.user.firstName } { state.user.lastName }!
          </div>
          <div>
            <Link to={`/bookings/${state.user.id}/create`}>Create Booking</Link>
          </div>
        </div>
      ) : (
        <div> User not found </div>
      )
    }
  </div>);
}

const CreateUser: React.FC = () => {

  interface NewUser {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    address: string
  }

  const [ user, setNewUser ] = React.useState<NewUser>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: ''
  });

  const handleSubmit = (event: React.FormEvent) =>  {
    console.log('in create user');
    console.log(user);
    callCreateUser(user);
    event.preventDefault();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedUser = { [name]: value } as Pick<NewUser, keyof NewUser>;
    setNewUser({...user, ...updatedUser });
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
          <input name="firstName" type="text" value={user.firstName} onChange={handleChange} />
      </label>

      <label>
        Last Name:
          <input name="lastName" type="text" value={user.lastName} onChange={handleChange} />
      </label>

      <label>
        Mobile Number:
          <input name="mobileNumber" type="text" value={user.mobileNumber} onChange={handleChange} />
      </label>

      <label>
        Address:
          <input name="address" type="text" value={user.address} onChange={handleChange} />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}


export { ListUsers, CreateUser, GetUser };