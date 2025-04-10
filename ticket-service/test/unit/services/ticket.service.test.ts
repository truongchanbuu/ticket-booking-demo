import Ticket from "@/models/ticket.model";
import TicketRepository from "../../../src/repositories/ticket.repository";
import { TicketService } from "../../../src/services/ticket.service";
import { CreateTicketDto } from "@/dtos/create_ticket.dto";

describe("TicketService", () => {
  let ticketRepoMock: jest.Mocked<TicketRepository>;
  let ticketService: TicketService;

  beforeEach(() => {
    ticketRepoMock = {
      createTicket: jest.fn(),
      findAll: jest.fn(),
      getTicketByID: jest.fn(),
    } as unknown as jest.Mocked<TicketRepository>;

    ticketService = new TicketService(ticketRepoMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call createTicket with correct arguments for each ticket", async () => {
    const dto: CreateTicketDto = new CreateTicketDto({
      eventOrganizerID: "eo123",
      eventID: "e123",
      ticketName: "Concert Ticket",
      ticketDesc: "Ticket for live concert",
      ticketType: "standard",
      ticketBasePrice: 150,
      count: 10,
      ticketDiscount: 0,
    });

    const mockTicket = new Ticket(
      `TK-${dto.eventOrganizerID}-${dto.eventID}-${Date.now()}`,
      dto.eventID,
      dto.eventOrganizerID,
      dto.ticketName,
      dto.ticketDesc,
      dto.ticketType,
      dto.ticketBasePrice,
      dto.ticketDiscount ?? 0,
      dto.count,
      dto.count,
      new Date()
    );

    ticketRepoMock.createTicket.mockResolvedValue(mockTicket);
    await ticketService.createTicket(dto);

    expect(ticketRepoMock.createTicket).toHaveBeenCalledWith(
      expect.objectContaining({
        eventID: dto.eventID,
        eventOrganizerID: dto.eventOrganizerID,
        ticketName: dto.ticketName,
        ticketDescription: dto.ticketDesc,
        ticketType: dto.ticketType,
        ticketBasePrice: dto.ticketBasePrice,
        ticketDiscount: dto.ticketDiscount,
        maxAvailable: dto.count,
        remaining: dto.count,
        sold: 0,
      })
    );
  });

  it("should not call createTicket if count is 0", async () => {
    const dto = new CreateTicketDto({
      eventOrganizerID: "eo123",
      eventID: "e123",
      ticketName: "Concert Ticket",
      ticketDesc: "Ticket for live concert",
      ticketType: "standard",
      ticketBasePrice: 150,
      count: 0,
      ticketDiscount: 0,
    });

    await expect(ticketService.createTicket(dto)).rejects.toThrow(
      "Invalid data passed to service"
    );
    expect(ticketRepoMock.createTicket).not.toHaveBeenCalled();
  });
});
