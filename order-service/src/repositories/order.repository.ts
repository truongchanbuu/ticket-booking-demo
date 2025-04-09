import { OrderStatus } from "@/enums/order_status";
import Order from "@/models/order.model";

export default interface OrderRepository {
  createOrder(
    userID: string,
    eventID: string,
    ticketID: string,
    quantity: number
  ): Promise<Order>;
  updateStatus(orderID: string, status: OrderStatus): Promise<OrderStatus>;
  getOrderByID(orderID: string): Promise<Order>;
}
