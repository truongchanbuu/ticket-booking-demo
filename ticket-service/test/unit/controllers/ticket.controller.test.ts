import request from "supertest";
import { CreateTicketDto } from "@/dtos/create_ticket.dto";
import { createApp } from "@/app";

describe("POST /tickets", () => {
  const mockTicketService = {
    createTicket: jest.fn(),
  } as any;

  const app = createApp();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 when ticket is created", async () => {
    const createTicketDto: CreateTicketDto = new CreateTicketDto({
      eventID: "e1",
      eventOrganizerID: "eo1",
      ticketName: "Standard",
      ticketDesc: "Basic",
      ticketType: "standard",
      ticketBasePrice: 100,
      count: 1,
      ticketDiscount: 0,
    });

    const res = await request(app).post("/tickets").send(createTicketDto);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 0,
        message: "success",
        data: expect.objectContaining({
          eventID: "e1",
          eventOrganizerID: "eo1",
          ticketName: "Standard",
          ticketDescription: "Basic", // Sửa lại field name
          ticketType: "standard",
          ticketBasePrice: 100,
          ticketDiscount: 0,
        }),
      })
    );
  });

  it("should return 400 when missing required field", async () => {
    const res = await request(app).post("/tickets").send({
      ticketName: "Standard", // thiếu eventID
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
    expect(mockTicketService.createTicket).not.toHaveBeenCalled();
  });

  it("should return 400 when ticketBasePrice is not a number", async () => {
    const res = await request(app).post("/tickets").send({
      eventID: "e1",
      ticketName: "Standard",
      ticketDescription: "Basic",
      ticketType: "standard",
      ticketBasePrice: "abc",
      count: 1,
    });

    expect(res.status).toBe(400);
    expect(mockTicketService.createTicket).not.toHaveBeenCalled();
  });

  it("should return 400 if any string field is empty", async () => {
    const invalidTicketData = {
      eventOrganizerID: "",
      eventID: "event123",
      ticketName: "",
      ticketDesc: "",
      ticketBasePrice: 0,
    };

    await request(app).post("/tickets").send(invalidTicketData).expect(400);
    expect(mockTicketService.createTicket).not.toHaveBeenCalled();
  });
});
