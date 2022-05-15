import React from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { courierTypeToString, isValidPhMobile } from '../utils/utils';
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

  interface FormInput {
    displayName: string,
    name: string,
    value: string
  }

  const [ state, setState ] = React.useState<State>({
    recipient: {
      fullName: '',
      mobileNumber: '',
      address: '',
      lat: '',
      lng: ''
    },
    availableCouriers: []
  });

  let params = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    if(params.userId) {
      callGetUser(params.userId).then(userRes => {
        // setState(prevState => ({...prevState, ...{ user: userRes }}));
        updateState({ user: userRes });
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRecipient: Recipient = { [name]: value } as Pick<Recipient, keyof Recipient>;
    // setState(prevState => ({...prevState, ...{ recipient: {...prevState.recipient, ...updatedRecipient }}}));
    updateStateP(prevState => ({ recipient: {...prevState.recipient, ...updatedRecipient }}));
    // console.log(state.recipient);
  }

  const handleSubmit = (event: React.FormEvent) => {
    // setState((prevState) => ({ ...prevState, ...{ availableCouriers: [] } }))
    updateState({ availableCouriers: [] });

    const pickUpLat =  parseFloat(state.recipient.lat);
    const pickUpLng =  parseFloat(state.recipient.lng);

    if(pickUpLat && pickUpLng && state.user?.id && isValidPhMobile(state.recipient.mobileNumber)) {
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
            // setState((prevState) => ({ ...prevState, ...{ availableCouriers: [...prevState.availableCouriers, ...response] } }));
            updateStateP((prevState) => ({ availableCouriers: [...prevState.availableCouriers, ...response] }));
          },
          complete: () => {
            console.log('after');
          }
        };
        callGetAvailableCouriers({ userId: state.user.id, dropOff }).subscribe(observable);


    } else {
      alert('Invalid values');
      updateStateP(ps => ({ recipient: { ...ps.recipient, ...{ mobileNumber: '', lat: '', lng: '' } } }));
    }

    event.preventDefault();
  }

  const onButtonPressed = (id: string) => {
    navigate(`/bookings/${state.user?.id}/${id}`);
  }

  const renderAvailableCourierRow = (res: PX.GetAvailableCouriersResponse, idx: number) => {
    const success = res.success;
    const name = success? courierTypeToString(success.courier) : 'ERROR';
    const price = success? success.price : '-';
    const action = success? (
      <button onClick={() => onButtonPressed(success.id)}>Select</button>
    ) : <div></div>
    return (
      <tr key={idx}>
        <td>{name}</td>
        <td>{price}</td>
        <td>{action}</td>
      </tr>
    );
  }

  const updateState = (state: Partial<State>) => {
    setState(prevState => ({...prevState, ...state}));
  }

  type Func = (prevState: State) => Partial<State>

  const updateStateP = (func: Func) => {
    setState(prevState => ({...prevState, ...func(prevState)}));
  }

  const renderFormInput = (i: FormInput) => {
    return (
      <div className='FormInput-container'>
        <div className='FormInput-title' key={i.name}>{ i.displayName }</div>
        <input className='FormInput-content'
            name={i.name} type="text" value={i.value} onChange={handleChange}/>
      </div>
    );
  }

  const formInputs: Array<FormInput> =
    [ { displayName: 'Full Name', name: 'fullName', value: state.recipient.fullName }
    , { displayName: 'Mobile Number', name: 'mobileNumber', value: state.recipient.mobileNumber }
    , { displayName: 'Address', name: 'address', value: state.recipient.address }
    , { displayName: 'Lat', name: 'lat', value: state.recipient.lat }
    , { displayName: 'Lng', name: 'lng', value: state.recipient.lng }
    ]

  return (
    <div className='Page'>
      <h2>Recipient</h2>
      <form onSubmit={handleSubmit}>
        { formInputs.map(i => renderFormInput(i)) }
        <input type="submit" value="Submit" />
      </form>

      <div className='CreateBooking-content'>
        <h2>Select a courier</h2>
        <table >
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          { state.availableCouriers &&
              state.availableCouriers.map((availableCourier, idx) => renderAvailableCourierRow(availableCourier, idx))
          }
        </table>
      </div>
    </div>
  );
}

export {
  CreateBooking
}