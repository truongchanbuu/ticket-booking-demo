import { Request, Response } from "express";
import OrderService from "@/services/order.service";

export default class OrderController {
  constructor(private orderService: OrderService) {}

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userID, eventID, ticketID, quantity } = req.body;

      if (!userID || !ticketID || !quantity || !eventID) {
        res
          .status(400)
          .json({ code: 1, message: "missing required fields", data: null });
        return;
      }

      if (
        Number.isNaN(quantity) ||
        quantity <= 0 ||
        !Number.isInteger(Number(quantity)) ||
        userID == "" ||
        ticketID == "" ||
        eventID == ""
      ) {
        res.status(400).json({ code: 1, message: "Invalid data", data: null });
        return;
      }

      const order = await this.orderService.bookTicket(
        userID,
        eventID,
        ticketID,
        quantity
      );

      res.status(201).json({ code: 0, message: "success", data: order });
    } catch (e) {
      res
        .status(500)
        .json({ code: 1, message: "failed to create order", data: null });
    }

    return;
  }
}
