import TicketRepositoryImpl from "./repositories/ticket.repository.impl";
import { createTicketRouter } from "./routes/ticket.routes";
import { TicketService } from "./services/ticket.service";

const ticketRepo = new TicketRepositoryImpl();
const ticketService = new TicketService(ticketRepo);
const ticketRouter = createTicketRouter(ticketService);

export { ticketRouter };
