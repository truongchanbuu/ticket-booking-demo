import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  constructor(private repo: OrderRepository) {}

  async bookTicket(userId: string, eventId: string) {
    const remaining = await this.repo.getRemainingTickets(eventId);
    if (remaining <= 0) {
      throw new Error("Sold out");
    }

    await this.repo.decreaseTickets(eventId, 1);
    return this.repo.createOrder(userId, eventId);
  }
}
