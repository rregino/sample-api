import React from 'react';
import {
  useNavigate
} from "react-router-dom";
import { isValidPhMobile } from '../utils/utils';
import { callCreateUser } from './../client';

const CreateUser: React.FC = () => {

  let navigate = useNavigate();

  interface NewUser {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    address: string,
    lat: string,
    lng: string
  }

  interface FormInput {
    displayName: string,
    name: string,
    value: string
  }

  const [ user, setNewUser ] = React.useState<NewUser>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    lat: '',
    lng: ''
  });

  const handleSubmit = (event: React.FormEvent) =>  {
    const lat = parseFloat(user.lat);
    const lng = parseFloat(user.lng);

    if(lat && lng && isValidPhMobile(user.mobileNumber)) {
      const req =
        { firstName: user.firstName
        , lastName: user.lastName
        , mobileNumber: user.mobileNumber
        , address: user.address
        , lat
        , lng
        }
      callCreateUser(req).then(res => navigate('/users'));
    } else {
      alert('Invalid values');
      const newLatLng = { mobileNumber: '', lat: '', lng: '' };
      setNewUser((prevState) => ({ ...prevState, ...newLatLng }));
    }
    event.preventDefault();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedUser = { [name]: value } as Pick<NewUser, keyof NewUser>;
    setNewUser({...user, ...updatedUser });
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
    [ { displayName: 'First Name', name: 'firstName', value: user.firstName }
    , { displayName: 'Last Name', name: 'lastName', value: user.lastName }
    , { displayName: 'Mobile Number', name: 'mobileNumber', value: user.mobileNumber }
    , { displayName: 'Address', name: 'address', value: user.address }
    , { displayName: 'Lat', name: 'lat', value: user.lat }
    , { displayName: 'Lng', name: 'lng', value: user.lng }
    ]

  return(
    <form onSubmit={ handleSubmit }>
      { formInputs.map(i => renderFormInput(i)) }
      <input type="submit" value="Submit" />
    </form>
  );
}

export {
  CreateUser
};