import { Router } from "express";
import { validateDto } from "@/validators/validate";
import { CreateTicketDto } from "@/dtos/create_ticket.dto";
import { TicketService } from "@/services/ticket.service";
import TicketController from "@/controllers/ticket.controller";

export function createTicketRouter(service: TicketService): Router {
  const router = Router();
  const controller = new TicketController(service);

  router.post(
    "/",
    validateDto(CreateTicketDto),
    controller.createTicket.bind(controller)
  );

  return router;
}
