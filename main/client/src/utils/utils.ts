import * as PX from "./../proto/xpress";

const bookingStatusToString = (status: PX.BookingStatus) => {
  switch(status) {
    case PX.BookingStatus.NO_STATUS: return 'Initialized';
    case PX.BookingStatus.REQUESTED: return 'Requested';
    case PX.BookingStatus.CANCELED: return 'Canceled';
    default: return 'Unknown';
  }
}

export {
  bookingStatusToString
}