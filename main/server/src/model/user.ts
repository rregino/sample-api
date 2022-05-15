interface NewUser {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  address: string,
  birthday?: Date,
  lat: number,
  lng: number
}

interface User extends NewUser {
  id: string
}

export {
  NewUser,
  User
}