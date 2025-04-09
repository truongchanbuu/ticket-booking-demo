import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export default class TicketController {
  constructor(private ticketService: TicketService) {}

  /**
   * @param req contains ticket information and count
   * @param res returns json with code, message and data
   * @returns a list of tickets with `count` length
   */
  public async createTickets(req: Request, res: Response) {
    throw new Error("Unimplemented method");
  }
}
