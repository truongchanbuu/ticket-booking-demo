export default class Ticket {
  constructor(
    public readonly ticketID: string,
    public readonly eventID: string,
    public readonly eventOrganizerID: string,
    public ticketName: string,
    public ticketDescription: string,
    public ticketType: string,
    public ticketBasePrice: number,
    public ticketDiscount: number,
    public maxAvailable: number,
    public remaining: number = maxAvailable,
    public readonly createdAt: Date = new Date(),
    public updatedAt?: Date
  ) {}

  /**
   * Calculates the final ticket price after applying the discount.
   */
  get finalPrice(): number {
    return this.ticketBasePrice * (1 - this.ticketDiscount);
  }

  get sold(): number {
    return this.maxAvailable - this.remaining;
  }
}
