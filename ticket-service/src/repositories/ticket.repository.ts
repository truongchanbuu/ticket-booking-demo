import { Ticket } from "../models/ticket.model";

export default interface TicketRepository {
  createTickets(
    eventID: string,
    ticketName: string,
    ticketDesc: string,
    ticketType: string,
    basePrice: number,
    count: number,
    ticketDiscount?: number
  ): Promise<Ticket[]>;
  findAll(): Promise<Ticket[]>;
}
