import TicketRepository from "../../../src/repositories/ticket.repository";
import { TicketService } from "../../../src/services/ticket.service";

describe("TicketService", () => {
  let ticketRepoMock: jest.Mocked<TicketRepository>;
  let ticketService: TicketService;

  beforeEach(() => {
    ticketRepoMock = {
      createTickets: jest.fn(),
      findAll: jest.fn(),
    };

    ticketService = new TicketService(ticketRepoMock);
  });

  it("should call createTickets with correct arguments", async () => {
    const eventId = "event-123";
    const name = "Standard Ticket";
    const desc = "Access to general area";
    const type = "standard";
    const basePrice = 100;
    const count = 3;
    const discount = 10;

    ticketRepoMock.createTickets.mockResolvedValue([]);

    await ticketService.createTickets(
      eventId,
      name,
      desc,
      type,
      basePrice,
      count,
      discount
    );

    expect(ticketRepoMock.createTickets).toHaveBeenCalledWith(
      eventId,
      name,
      desc,
      type,
      basePrice,
      count,
      discount
    );
  });

  it("should not call createTickets if count is 0", async () => {
    await ticketService.createTickets(
      "event-x",
      "Ticket",
      "desc",
      "vip",
      100,
      0
    );
    expect(ticketRepoMock.createTickets).not.toHaveBeenCalled();
  });
});
