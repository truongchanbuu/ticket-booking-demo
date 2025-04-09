interface Order {
  orderID: string;
  ticketID: string;
  userID: string;
  eventID: string;
  quantity: number;
  totalPrice: number;
  status: "confirmed" | "canceled";
  createdAt: Date;
  updatedAt?: Date;
}
