import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

export default class TicketController {
  constructor(private ticketService: TicketService) {}

  /**
   * @param req contains ticket information and count
   * @param res returns json with code, message and data
   * @returns a ticket
   */
  public async createTicket(req: Request, res: Response) {
    try {
      const ticket = await this.ticketService.createTicket(req.body);

      res.status(201).json({
        code: 0,
        message: 'success',
        data: ticket,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        code: 1,
        message: 'cannot create ticket',
        data: null,
      });
    }

    return;
  }
}
