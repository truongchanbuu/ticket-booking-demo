export class Ticket {
  constructor(
    public readonly ticketID: string,
    public readonly eventID: string,
    public ticketName: string,
    public ticketDescription: string,
    public ticketType: string,
    public ticketBasePrice: number,
    public ticketDiscount: number,
    public totalTickets: number,
    public numOfSoldTickets: number,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date
  ) {}

  /**
   * Calculates the final ticket price after applying the discount.
   */
  get finalPrice(): number {
    return this.ticketBasePrice * (1 - this.ticketDiscount);
  }

  /**
   * Returns the number of tickets still available for purchase.
   */
  get availableTickets(): number {
    return this.totalTickets - this.numOfSoldTickets;
  }

  /**
   * Checks if the ticket is currently sold out.
   */
  isSoldOut(): boolean {
    return this.availableTickets <= 0;
  }

  /**
   * Sell one ticket — updates sold count and timestamp.
   */
  sellOne(): void {
    if (this.isSoldOut()) {
      throw new Error("Tickets are sold out.");
    }

    this.numOfSoldTickets++;
    this.updatedAt = new Date();
  }
}
