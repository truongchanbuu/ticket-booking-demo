import Ticket from "../models/ticket.model";

export default interface TicketRepository {
  createTicket(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  getTicketByID(ticketID: string): Promise<Ticket>;
}
