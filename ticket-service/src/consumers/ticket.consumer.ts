import TicketRepository from "../repositories/ticket.repository";
import { TicketService } from "../services/ticket.service";

export default class TicketConsumer {
  constructor(private ticketService: TicketService) {}

  public async handleEventCreated(message: any) {
    throw new Error("Unimplemeted method");
  }
}
