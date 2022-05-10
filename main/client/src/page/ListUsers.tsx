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
    <div>
      <nav className="list-group">
          {users &&
            users.map(user => (
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

export {
  ListUsers
}