import React from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { callBookCourier, callCancelCourier, callGetAvailableCouriers, callGetBooking, callGetUser } from './client';
import * as PU from "./proto/users";
import * as PX from "./proto/xpress";
import { bookingStatusToString } from './utils/utils';

const CreateBookings: React.FC = () => {

  type State = {
    user?: PU.User,
    recipient: Recipient,
    availableCouriers: Array<PX.GetAvailableCouriersResponse>,
    activeBookingId?: string
  }

  type Recipient = {
    fullName: string;
    mobileNumber: string;
    address: string;
    lat: string;
    lng: string;
  }

  const [ state, setState ] = React.useState<State>({
    recipient: {
      fullName: 'Harry Potter',
      mobileNumber: '639196105668',
      address: 'Unit 407 JG Building, C. Raymundo Avenue, Rosario, Pasig, 1909 Metro Manila',
      lat: '14.585483785289902',
      lng: '121.08841461243956'
    },
    availableCouriers: []
  });

  let params = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    if(params.userId) {
      callGetUser(params.userId).then(userRes => {
        setState(prevState => ({...prevState, ...{ user: userRes }}));
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRecipient: Recipient = { [name]: value } as Pick<Recipient, keyof Recipient>;
    setState(prevState => ({...prevState, ...{ recipient: {...prevState.recipient, ...updatedRecipient }}}));
    console.log(state.recipient);
  }

  const handleSubmit = (event: React.FormEvent) => {
    setState((prevState) => ({ ...prevState, ...{ availableCouriers: [] } }))

    const pickUpLat =  parseFloat(state.recipient.lat);
    const pickUpLng =  parseFloat(state.recipient.lng);

    if(pickUpLat && pickUpLng && state.user?.id) {
      const dropOff: PX.Point =
        { fullName: state.recipient.fullName,
          mobileNumber: state.recipient.mobileNumber,
          address: state.recipient.address,
          lat: pickUpLat,
          lng: pickUpLng
        }

        const observable = {
          next: (value: PX.GetAvailableCouriersResponse) => {
            const response = [ value ];
            setState((prevState) => ({ ...prevState, ...{ availableCouriers: [...prevState.availableCouriers, ...response] } }));
          },
          complete: () => {
            console.log('after');
          }
        };
        callGetAvailableCouriers({ userId: state.user.id, dropOff }).subscribe(observable);


    } else alert('Invalid lat lng');

    event.preventDefault();
  }

  const onButtonPressed = (id: string) => {
    navigate(`/bookings/${state.user?.id}/${id}`);
  }

  const renderAvailableCouriers = (res: PX.GetAvailableCouriersResponse) => {
    if(res.success) {
      const success = res.success;
      return (
        <div key={success.id}>
          { translateCourier(success.courier) } -- PHP { success.price }
          <button onClick={() => onButtonPressed(success.id)}>
            Select
        </button>
        </div>
      );
    } else if(res.error) return <div> Error: { res.error.errorMessage } </div>;
    else return <div/>;
  }

  return <div>
    Recipient
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Full name:
            <input name="fullName" type="text" value={state.recipient.fullName} onChange={handleChange}/>
        </label>
        <label>
          Mobile number:
            <input name="mobileNumber" type="text" value={state.recipient.mobileNumber} onChange={handleChange}/>
        </label>

        <label>
          Address:
            <input name="address" type="text" value={state.recipient.address} onChange={handleChange}/>
        </label>

        <label>
          Lat:
            <input name="lat" type="text" value={state.recipient.lat} onChange={handleChange}/>
        </label>

        <label>
          Lng:
            <input name="lng" type="text" value={state.recipient.lng} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    <div>
      Couriers:
        { state.availableCouriers &&
          state.availableCouriers.map(availableCourier => renderAvailableCouriers(availableCourier))
        }
    </div>
  </div>
}

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
        // setState(prevState => ({...prevState, ...{ booking: bookingRes }}));
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
      // setState(prevState => ({...prevState, ...{ isBookPressed: true }}));
      updateState({ isBookPressed: true });
      callBookCourier(state.booking.id).then(res => {
        if(res && res.booking) {
          updateState({ booking: res.booking, isBookPressed: false });
          // setState(prevState => ({...prevState, ...{ booking: res.booking, isBookPressed: false }}));
        }
      })
    }
  };

  const onCancelPressed = () => {
    if(state.booking?.id) {
      // setState(prevState => ({...prevState, ...{ isCancelPressed: true }}));
      updateState({ isCancelPressed: true });
      callCancelCourier(state.booking?.id).then(res => {
        if(res && res.booking) {
          updateState({ booking: res.booking, isCancelPressed: false });
          // setState(prevState => ({...prevState, ...{ booking: res.booking, isCancelPressed: false }}));
        }
      })
    }
  }

  const updateState = (state: Partial<State>) => {
    setState(prevState => ({...prevState, ...state}));
  }

  const isCancelButtonDisabled = () => {
    if (state.isCancelPressed) {
      return true;
    } else if(state.booking) {
      return state.booking?.status !== PX.BookingStatus.REQUESTED;
    }
    return true;
  }

  const isBookButtonDisabled = () => {
    if(state.isBookPressed) {
      return true;
    } else if(state.booking) {
      return state.booking?.status === PX.BookingStatus.REQUESTED;
    }
    return true;
  }

  return <div>
    Details
    <div>
      Courier:
      { state.booking?.courier ?
        translateCourier(state.booking.courier) : <div>No Courier</div>
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

const translateCourier = (courierType: PX.CourierType) => {
  switch(courierType) {
    case PX.CourierType.BORZO: return 'Borzo';
    case PX.CourierType.LALAMOVE: return 'Lalamove';
    default: return 'Others';
  }
}

export {
  CreateBookings,
  GetBooking
};