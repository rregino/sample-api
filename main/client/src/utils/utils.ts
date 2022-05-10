import * as PX from "./../proto/xpress";

const bookingStatusToString = (status: PX.BookingStatus) => {
  switch(status) {
    case PX.BookingStatus.NO_STATUS: return 'Initialized';
    case PX.BookingStatus.REQUESTED: return 'Requested';
    case PX.BookingStatus.CANCELED: return 'Canceled';
    default: return 'Unknown';
  }
}

const courierTypeToString = (courierType: PX.CourierType) => {
  switch(courierType) {
    case PX.CourierType.BORZO: return 'Borzo';
    case PX.CourierType.LALAMOVE: return 'Lalamove';
    default: return 'Others';
  }
}


export {
  bookingStatusToString,
  courierTypeToString
}