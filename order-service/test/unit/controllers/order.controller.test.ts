import request from "supertest";
import { Express } from "express";
import OrderService from "@/services/order.service";
import Order from "@/models/order.model";
import { OrderStatus } from "@/enums/order_status";
import { createTestApp } from "../../set_up_test_app";

describe("OrderController - createOrder (supertest)", () => {
  let mockOrderService: jest.Mocked<OrderService>;
  let app: Express;

  beforeEach(() => {
    mockOrderService = {
      bookTicket: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    app = createTestApp(mockOrderService);
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

    const res = await request(app).post("/orders").send({
      userID: "u1",
      eventID: "e1",
      ticketID: "t1",
      quantity: 2,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      code: 0,
      message: "success",
      data: expect.objectContaining({
        orderID: "o1",
      }),
    });
  });

  it("should return 400 if missing fields", async () => {
    const res = await request(app).post("/orders").send({
      userID: "u1",
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      code: 1,
      message: "missing required fields",
      data: null,
    });
  });

  it("should return 400 if quantity is not a number", async () => {
    const invalidOrderData = {
      userID: "user123",
      eventID: "event123",
      ticketID: "ticket123",
      quantity: "not-a-number",
    };

    await request(app)
      .post("/orders")
      .send(invalidOrderData)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({
          code: 1,
          message: "Invalid data",
          data: null,
        });
        expect(mockOrderService.bookTicket).not.toHaveBeenCalled();
      });
  });

  it("should return 400 if any string field is empty", async () => {
    const invalidOrderData = {
      userID: "",
      eventID: "event123",
      ticketID: "ticket123",
      quantity: 2,
    };

    await request(app)
      .post("/orders")
      .send(invalidOrderData)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({
          code: 1,
          message: "missing required fields",
          data: null,
        });
        expect(mockOrderService.bookTicket).not.toHaveBeenCalled();
      });
  });

  it("should return 500 if service throws", async () => {
    mockOrderService.bookTicket.mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/orders").send({
      userID: "u1",
      eventID: "e1",
      ticketID: "t1",
      quantity: 2,
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      code: 1,
      message: "failed to create order",
      data: null,
    });
  });
});
