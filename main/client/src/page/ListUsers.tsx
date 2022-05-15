import React from 'react';
import {
  Link
} from "react-router-dom";
import { callListUsers } from './../client';
import * as PU from "./../proto/users";

const ListUsers: React.FC = () => {
  const [users, setUsers] = React.useState<Array<PU.User>>([]);

  React.useEffect(() => {
    callListUsers().then(usersRes => {
      setUsers(usersRes);
    })
  }, []);

  return (
    <div className='Page'>
      { users &&
          users.map(user => (
            <Link
              className='ListUsers-link'
              to={`/bookings/${user.id}`}
              key={user.id}
            >
              {user.firstName} {user.lastName}
            </Link>
          ))
        }
    </div>
  );
}

export {
  ListUsers
}