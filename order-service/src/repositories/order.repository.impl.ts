import { OrderStatus } from "@/enums/order_status";
import Order from "@/models/order.model";
import OrderRepository from "@/repositories/order.repository";

export class OrderRepositoryImpl implements OrderRepository {
  async createOrder(
    userID: string,
    eventID: string,
    ticketID: string,
    quantity: number
  ): Promise<Order> {
    throw new Error("Unimplemented method");
  }

  async updateStatus(
    orderID: string,
    status: OrderStatus
  ): Promise<OrderStatus> {
    throw new Error("Unimplemented method");
  }

  async getOrderByID(orderID: string): Promise<Order> {
    throw new Error("Unimplemented method");
  }
}
