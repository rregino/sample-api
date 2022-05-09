import React from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { callGetAvailableCouriers, callGetBooking, callGetUser } from './client';
import * as PU from "./proto/users";
import * as PX from "./proto/xpress";

const CreateBookings: React.FC = () => {

  type State = {
    user?: PU.User,
    recipient: Recipient,
    availableCouriers: Array<PX.GetAvailableCouriersResponse_Success>,
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
        console.log('USER?!?!');
        console.log(userRes);
        setState({...state, ...{ user: userRes }});
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRecipient: Recipient = { [name]: value } as Pick<Recipient, keyof Recipient>;
    setState({...state, ...{ recipient: {...state.recipient, ...updatedRecipient }}});

    console.log('UPDATED STATE');
    console.log(state.recipient);
  }

  const handleSubmit = (event: React.FormEvent) => {
    setState((prevState) => ({ ...prevState, ...{ availableCouriers: [] } }))

    const dropOff: PX.Point =
      { fullName: state.recipient.fullName,
        mobileNumber: state.recipient.mobileNumber,
        address: state.recipient.address,
        lat: parseFloat(state.recipient.lat),
        lng: parseFloat(state.recipient.lng)
      }

    const pickUp: PX.Point =
      { fullName: `${state.user?.firstName} ${state.user?.lastName}`,
        mobileNumber: `${state.user?.mobileNumber}`,
        address: `${state.user?.address}`,
        lat: parseFloat(state.recipient.lat),
        lng: parseFloat(state.recipient.lng)
      }

    console.log('PICKUP');
    console.log(pickUp);
    console.log('DROPOFF');
    console.log(dropOff);

    const observable = {
      next: (value: PX.GetAvailableCouriersResponse) => {
        if(value.success) {
          const newAvailableCourier = [ value.success ];
          setState((prevState) => ({ ...prevState, ...{ availableCouriers: [...prevState.availableCouriers, ...newAvailableCourier] } }));
        }
      },
      complete: () => {
        console.log('after');
      }
    };
    callGetAvailableCouriers({ pickUp, dropOff }).subscribe(observable);
    event.preventDefault();
  }

  const translateCourier = (courierType: PX.CourierType) => {
    if(courierType === PX.CourierType.BORZO) {
      return "Borzo";
    } else if(courierType === PX.CourierType.LALAMOVE) {
      return "Lalamove";
    } else {
      return "Others";
    }
  }

  const onButtonPressed = (id: string) => {
    navigate(`/bookings/${state.user?.id}/${id}`);
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
        { state.availableCouriers && state.availableCouriers.map((availableCourier, index) => (
          <div key={availableCourier.id}>
            { translateCourier(availableCourier.courier) } -- PHP { availableCourier.price }
            <button onClick={() => onButtonPressed(availableCourier.id)}>
              Select
            </button>
          </div>
        ))
        }
    </div>
  </div>
}

const GetBooking: React.FC = () => {
  let params = useParams();

  type State = {
    user?: PU.User,
    booking?: PX.Booking
  }

  React.useEffect(() => {
    if(params.userId) {
      callGetUser(params.userId).then(userRes => {
        if(params.bookingId) {
          return callGetBooking(params.bookingId).then(bookingRes => {
            if(bookingRes?.status === PX.BookingStatus.NO_STATUS) { //todo should move to server

            } else {

            }
          });
        } else {
          //return error
        }
      });
    }
  }, []);

  return <div>
    Check details:
    <div>
      Sender:
      <div> {} </div>
    </div>
  </div>
}

export {
  CreateBookings,
  GetBooking
};