export interface OrderRepository {
  createOrder(userID: string, eventID: string): Promise<Order>;
  getRemainingTickets(eventID: string): Promise<number>;
  decreaseTickets(eventID: string, quantity: number): Promise<void>;
}
