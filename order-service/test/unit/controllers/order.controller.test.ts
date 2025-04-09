import OrderController from "@/controllers/order.controller";
import { OrderStatus } from "@/enums/order_status";
import Order from "@/models/order.model";
import OrderService from "@/services/order.service";
import { Request, Response } from "express";

describe("OrderController", () => {
  let mockOrderService: jest.Mocked<OrderService>;
  let controller: OrderController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Mock orderService
    mockOrderService = {
      bookTicket: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    controller = new OrderController(mockOrderService);

    // Mock req & res
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    req = {
      body: {
        userID: "u1",
        eventID: "e1",
        ticketID: "t1",
        quantity: 2,
      },
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return 201 and created order", async () => {
    const fakeOrder: Order = {
      orderID: "o1",
      userID: "u1",
      eventID: "e1",
      ticketID: "t1",
      quantity: 2,
      totalPrice: 100,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
    };

    mockOrderService.bookTicket.mockResolvedValue(fakeOrder);

    await controller.createOrder(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      code: 0,
      message: "success",
      data: fakeOrder,
    });
    expect(mockOrderService.bookTicket).toHaveBeenCalledWith(
      "u1",
      "e1",
      "t1",
      2
    );
  });

  it("should return 400 if missing fields", async () => {
    req.body = { userID: "u1" }; // missing fields

    await controller.createOrder(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      code: 1,
      message: "missing required fields",
      data: null,
    });
  });

  it("should return 500 if service throws", async () => {
    mockOrderService.bookTicket.mockRejectedValue(new Error("DB error"));

    await controller.createOrder(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      code: 1,
      message: "failed to create order",
      data: null,
    });
  });
});
