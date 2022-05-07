import { Booking } from "../model/booking";
import { SimpleDb } from "../model/db";

class InMemBookingDb implements SimpleDb<string, Booking> {

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
}

export {
  InMemBookingDb
}