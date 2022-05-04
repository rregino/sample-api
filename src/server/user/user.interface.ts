export interface NewUser {
  firstName: string,
  lastName: string,
  address: string
}

export interface User extends NewUser {
  id: number
}
