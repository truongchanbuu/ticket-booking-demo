import { OrderStatus } from "@/enums/order_status";

export default interface Order {
  orderID: string;
  ticketID: string;
  userID: string;
  eventID: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
}
