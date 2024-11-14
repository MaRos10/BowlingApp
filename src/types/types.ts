export type Bookings = {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
};

export type BookingResponse = {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  id: string;
  active: boolean;
};
