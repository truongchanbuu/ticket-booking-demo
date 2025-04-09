import TicketController from "./src/controllers/ticket.controller";
import TicketRepositoryImpl from "./src/repositories/ticket.repository.impl";
import { TicketService } from "./src/services/ticket.service";

const ticketRepo = new TicketRepositoryImpl();
const ticketService = new TicketService(ticketRepo);
const ticketController = new TicketController(ticketService);

export { ticketController };
