import React from 'react';
import {
  Link,
  useParams
} from "react-router-dom";
import { callBookCourier, callCancelCourier, callGetBooking } from '../client';
import * as PX from "../proto/xpress";
import { bookingStatusToString, courierTypeToString } from '../utils/utils';

const GetBooking: React.FC = () => {
  let params = useParams();

  type State = {
    booking?: PX.Booking,
    isBookPressed: boolean,
    isCancelPressed: boolean
    error?: string //todo add
  }

  const [ state, setState ] = React.useState<State>({ isBookPressed: false, isCancelPressed: false });

  React.useEffect(() => {
    if(params.bookingId) {
      callGetBooking(params.bookingId).then(bookingRes => {
        updateState({ booking: bookingRes });
      });
    }
  }, []);

  const renderPoint = (point: PX.Point) => {
    return (
      <div>
        <div> Full name: { point.fullName } </div>
        <div> Mobile Number: { point.mobileNumber }</div>
        <div> Address: { point.address }</div>
      </div>
    );
  }

  const onBookPressed = () => {
    if(state.booking?.id) {
      updateState({ isBookPressed: true });
      callBookCourier(state.booking.id).then(res => {
        if(res && res.booking) {
          updateState({ booking: res.booking, isBookPressed: false });
        }
      })
    }
  };

  const onCancelPressed = () => {
    if(state.booking?.id) {
      updateState({ isCancelPressed: true });
      callCancelCourier(state.booking?.id).then(res => {
        if(res && res.booking) {
          updateState({ booking: res.booking, isCancelPressed: false });
        }
      })
    }
  }

  const updateState = (state: Partial<State>) => {
    setState(prevState => ({...prevState, ...state}));
  }

  const isCancelButtonDisabled = () => {
    if (state.isCancelPressed) return true;
    else if(state.booking) return state.booking?.status !== PX.BookingStatus.REQUESTED;
    return true;
  }

  const isBookButtonDisabled = () => {
    if(state.isBookPressed) return true;
    else if(state.booking) return state.booking?.status === PX.BookingStatus.REQUESTED;
    return true;
  }

  const renderGetUserLink = (userId: string) => {
    return (
      <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/bookings/${userId}`}>
        User
      </Link>
    );
  }

  return <div>
    { params.userId ? renderGetUserLink(params.userId) : <div/> }
    Details
    <div>
      Courier:
      { state.booking?.courier ?
        courierTypeToString(state.booking.courier) : <div>No Courier</div>
      }
    </div>
    <div>
      Sender:
      { state.booking?.origin ?
          renderPoint(state.booking.origin) : <div>No Sender</div>
      }
    </div>
    <div>
      Recipient:
      { state.booking?.destination ?
          renderPoint(state.booking.destination) : <div>No Recipient</div>
      }
    </div>
    <div>
      Status: { state.booking ? bookingStatusToString(state.booking.status) : 'No status' }
    </div>
    <button disabled={ isBookButtonDisabled() } onClick={() => onBookPressed() }>
      Book
    </button>
    <button disabled={ isCancelButtonDisabled() } onClick={() => onCancelPressed() }>
      Cancel Booking
    </button>

  </div>
}

export {
  GetBooking
}