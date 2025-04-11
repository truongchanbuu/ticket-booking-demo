import TicketProducer from './kafka/ticket.producer';
import TicketRepositoryImpl from './repositories/ticket.repository.impl';
import { createTicketRouter } from './routes/ticket.routes';
import { TicketService } from './services/ticket.service';

export async function createContainer() {
  const ticketProducer = new TicketProducer();
  await ticketProducer.connect();

  const ticketRepo = new TicketRepositoryImpl();
  const ticketService = new TicketService(ticketRepo, ticketProducer.producer);

  const ticketRouter = createTicketRouter(ticketService);

  return {
    routers: {
      ticketRouter,
    },
    producers: {
      ticketProducer: ticketProducer.producer,
    },
    services: {
      ticketService,
    },
  };
}
