import { string } from 'fp-ts';
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

  const fields: Array<{ title: string, value: string }> =
  [ { title: 'Courier'
    , value: (
      state.booking?.courier ?
        courierTypeToString(state.booking.courier) : 'No Courier'
      )
    }
  , { title: 'Status'
    , value: (
        state.booking ? bookingStatusToString(state.booking.status) : 'No status'
      )
    }
  ]

  const renderGetUserLink = (userId: string) => {
    return (
      <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/bookings/${userId}`}>
        Go to User
      </Link>
    );
  }

  const renderPoint = (point: PX.Point) => {
    return (
      <div>
        <div className='GetBooking-point-container'> <h4>Full name:</h4> { point.fullName } </div>
        <div className='GetBooking-point-container'> <h4>Number:</h4> { point.mobileNumber }</div>
        <div className='GetBooking-point-container'> <h4>Address:</h4> { point.address }</div>
      </div>
    );
  }

  const renderField = (field: { title: string, value: string }) => {
    return (
      <div className='GetBooking-field-container'>
        <h4 className='GetBooking-field-header'>{field.title}</h4>
        <div>{ field.value}</div>
      </div>
    )
  }

  return (
    <div className='Page'>
      { params.userId ? renderGetUserLink(params.userId) : <div/> }

      <h2>Details</h2>

      { fields.map(f => renderField(f))
      }

      <div>
        <h4>Sender</h4>
        { state.booking?.origin ?
            renderPoint(state.booking.origin) : <div>No Sender</div>
        }
      </div>
      <div>
        <h4>Recipient</h4>
        { state.booking?.destination ?
            renderPoint(state.booking.destination) : <div>No Recipient</div>
        }
      </div>

      <div className='GetBooking-button-container'>
        <button disabled={ isBookButtonDisabled() } onClick={() => onBookPressed() }>
          Book
        </button>
        <button disabled={ isCancelButtonDisabled() } onClick={() => onCancelPressed() }>
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

export {
  GetBooking
}