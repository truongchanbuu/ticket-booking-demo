import TicketConsumer from "../../../src/consumers/ticket.consumer";
import { TicketService } from "../../../src/services/ticket.service";

describe("TicketConsumer", () => {
  it("should call createTickets when event-created message is received", async () => {
    const mockCreateTickets = jest.fn();
    const ticketServiceMock = {
      createTickets: mockCreateTickets,
    } as unknown as TicketService;

    const consumer = new TicketConsumer(ticketServiceMock);

    const mockMessage = {
      value: Buffer.from(
        JSON.stringify({
          eventId: "event-123",
          ticketName: "Standard",
          ticketDesc: "Nice seat",
          ticketType: "standard",
          basePrice: 100,
          count: 3,
          ticketDiscount: 5,
        }),
      ),
    };

    await consumer.handleEventCreated(mockMessage);

    expect(mockCreateTickets).toHaveBeenCalledWith(
      "event-123",
      "Standard",
      "Nice seat",
      "standard",
      100,
      3,
      5,
    );
  });
});
