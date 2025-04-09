import Order from "@/models/order.model";
import OrderRepository from "../repositories/order.repository";

export default class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private kafkaProducer: any
  ) {}

  async bookTicket(
    userId: string,
    eventId: string,
    ticketID: string,
    quantity: number
  ): Promise<Order> {
    throw new Error("Unimplemented method");
  }
}
