import React from 'react';
import {
  Link,
  useParams
} from "react-router-dom";
import { callCancelCourier, callGetBookings, callGetUser } from './../client';
import * as PU from "./../proto/users";
import * as PX from "./../proto/xpress";
import { bookingStatusToString } from './../utils/utils';

const GetUser: React.FC = () => {
  type State = {
    user: PU.User | null,
    bookings: Array<PX.Booking>
  }

  const [state, setState] = React.useState<State>({ user: null, bookings: [] });

  let params = useParams();

  React.useEffect(() => {
    if(params.userId) {
      const userId = params.userId;
      callGetUser(userId).then(userRes => {
        return callGetBookings(userId).then(bookingRes => {
          if(userRes) {
            // setState({...state, ...{ user: userRes, bookings: bookingRes }});
            updateState({ user: userRes, bookings: bookingRes });
          }
        })
      })
    }
  }, []);

  const onCancelPressed = (id: string) => {
    callCancelCourier(id).then(res => {
      if(res && res.booking) {
        const booking = res.booking;
        const index = state.bookings.findIndex(i => booking.id === i.id)

        const getUpdateBookings = () => {
          if(index > -1) {
            state.bookings[index] = booking;
            return state.bookings;
          } else {
            return state.bookings;
          }
        }

        const bookings = getUpdateBookings();

        updateState({ bookings });
        // setState({...state, ...updates})
      }
    })
  }

  const renderBookingRows = (booking: PX.Booking) => {
    return (
      <tr key={booking.id}>
        <td>{booking.id}</td>
        <td>{booking.destination?.fullName}</td>
        <td>{bookingStatusToString(booking.status)}</td>
        <td>
          <button disabled={ booking.status === PX.BookingStatus.CANCELED } onClick={() => onCancelPressed(booking.id) }>
            Cancel Booking
          </button>
        </td>
      </tr>
    );
  }

  const updateState = (state: Partial<State>) => {
    setState(prevState => ({...prevState, ...state}));
  }

  return (
    <div className='Page'>
      { state.user ? (
          <div>
            <div className='GetUser-title-container'>
              <h2 className='GetUser-title'>
                Hello { state.user.firstName } { state.user.lastName }!
              </h2>
              <div>
                <Link to={`/bookings/${state.user.id}/create`}>Create Booking</Link>
              </div>
            </div>

            <div className='GetUser-content'>
              <h3>Bookings</h3>
              <table>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                { state.bookings.map(b => renderBookingRows(b)) }
              </table>
            </div>
          </div>
        ) : (
          <h2> User not found </h2>
        )
      }
    </div>
  );
}

export {
  GetUser
}