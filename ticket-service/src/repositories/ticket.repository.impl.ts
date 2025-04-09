import { Ticket } from "../models/ticket.model";
import TicketRepository from "./ticket.repository";

export default class TicketRepositoryImpl implements TicketRepository {
  createTickets(
    eventID: string,
    ticketName: string,
    ticketDesc: string,
    ticketType: string,
    basePrice: number,
    count: number,
    ticketDiscount?: number
  ): Promise<Ticket[]> {
    throw new Error("Unimplemented method");
  }
  findAll(): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
  }
}
