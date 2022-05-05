export interface NewUser {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  address: string,
  birthday?: Date
}

export interface User extends NewUser {
  id: number
}
