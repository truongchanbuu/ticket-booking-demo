import { Router } from "express";
import { ticketController } from "../../container";

const ticketRouter = Router();

ticketRouter.get("/", ticketController.createTickets);

export default ticketRouter;
