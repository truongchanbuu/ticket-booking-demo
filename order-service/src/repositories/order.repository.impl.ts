import { OrderRepository } from "@/repositories/order.repository";

export class OrderRepositoryImpl implements OrderRepository {
  async createOrder(userID: string, eventID: string): Promise<Order> {
    // Giả sử đây là call đến Firestore hoặc DB
    return {
      ticketID: "t1",
      orderID: "o1",
      userID,
      eventID,
      quantity: 2,
      totalPrice: 100,
      createdAt: new Date(),
      status: "confirmed",
    };
  }

  async getRemainingTickets(eventID: string): Promise<number> {
    // call DB
    return 10;
  }

  async decreaseTickets(eventID: string, quantity: number): Promise<void> {
    // update ticket count
  }
}
