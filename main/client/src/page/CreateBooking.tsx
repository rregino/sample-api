import React from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { courierTypeToString } from '../utils/utils';
import { callGetAvailableCouriers, callGetUser } from '../client';
import * as PU from "../proto/users";
import * as PX from "../proto/xpress";

const CreateBooking: React.FC = () => {

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
          { courierTypeToString(success.courier) } -- PHP { success.price }
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

export {
  CreateBooking
}