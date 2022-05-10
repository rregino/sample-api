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
            setState({...state, ...{ user: userRes, bookings: bookingRes }});
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

        const updates = { bookings: getUpdateBookings() }

        setState({...state, ...updates})
      }
    })
  }

  const renderBooking = (booking: PX.Booking) => {
    return (
      <div>
        { booking.destination?.fullName } { `->` } { bookingStatusToString(booking.status) }
        <button disabled={ booking.status === PX.BookingStatus.CANCELED } onClick={() => onCancelPressed(booking.id) }>
          Cancel Booking
        </button>
      </div>
    );
  }

  return (<div>
    { state.user ? (
        <div>
          <div>
            Hello { state.user.firstName } { state.user.lastName }!
          </div>
          <div>
            Bookings: { state.bookings.map(b => renderBooking(b)) }
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

export {
  GetUser
}