import * as PU from "./proto/users";
import * as PX from "./proto/xpress";

const usersRpc = new PU.GrpcWebImpl('http://localhost:8080', { debug: false });
const usersClientImpl = new PU.UsersClientImpl(usersRpc);
const xpressRpc = new PX.GrpcWebImpl('http://localhost:8080', { debug: false });
const xpressClientImpl = new PX.XpressClientImpl(xpressRpc);

const callListUsers = () => {
  return usersClientImpl.ListUsers({}).then(res => {
    return res.users;
  });
};

const callGetUser = (userId: string) => {
  return usersClientImpl.GetUser({ id: userId }).then(res => res.user);
};

const callCreateUser = (req: PU.CreateUserRequest) => {
  return usersClientImpl.CreateUser(req);
}

const callGetBookings = (userId: string) => {
  return xpressClientImpl.ListBookings({ filter: { userId: userId, statuses: [ PX.BookingStatus.REQUESTED, PX.BookingStatus.CANCELED ] } }).then(res => {
    return res.bookings;
  });
};

const callGetAvailableCouriers = (req: PX.GetAvailableCouriersRequest) => {
  return xpressClientImpl.GetAvailableCouriers(req);
};

const callGetBooking = (id: string) => {
  return xpressClientImpl.GetBooking({ id }).then(res => res.booking);
};

const callBookCourier = (id: string) => {
  return xpressClientImpl.BookCourier({ id }).then(res => {
    return res.success;
  })
};

const callCancelCourier = (id: string) => {
  return xpressClientImpl.CancelBooking({ id }).then(res => {
    return res.success;
  })
}

export {
  callListUsers,
  callGetUser,
  callGetBookings,
  callGetBooking,
  callCreateUser,
  callGetAvailableCouriers,
  callBookCourier,
  callCancelCourier
}