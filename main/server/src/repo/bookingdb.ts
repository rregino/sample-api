import { Booking } from "../model/booking";
import { SimpleDb } from "../model/db";
import * as PX from "../../../proto/xpress";

interface BookingDb extends SimpleDb<string, Booking> {
  getBookingsForUser(userId: string, statuses: Array<PX.BookingStatus>): Array<Booking>
}

class InMemBookingDb implements BookingDb {

  inMemBookings: Array<Booking> = [];

  save(t: Booking): Booking {
    this.inMemBookings.push(t);
    return t;
  }

  update(t: Booking): void {
    const initBookings = this.inMemBookings.filter(b => b.id !== t.id);
    initBookings.push(t);
    this.inMemBookings = initBookings;
  }

  get(id: string): Booking | undefined {
    return this.inMemBookings.find(b => b.id == id);
  }

  list(): Array<Booking> {
    return this.inMemBookings;
  }

  getBookingsForUser(userId: string, statuses: Array<PX.BookingStatus>): Array<Booking> {
    return this.inMemBookings.filter(u => u.userId == userId && (statuses.length == 0 || statuses.includes(u.status)));
  }

}

export {
  BookingDb,
  InMemBookingDb
}