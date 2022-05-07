interface NewUser {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  address: string,
  birthday?: Date
}

interface User extends NewUser {
  id: number
}

export {
  NewUser,
  User
}