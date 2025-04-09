import OrderConsumer from "@/consumers/order.consumer";
import { OrderStatus } from "@/enums/order_status";
import Order from "@/models/order.model";
import OrderRepository from "@/repositories/order.repository";

describe("OrderConsumer", () => {
  it("confirms order when ticket reserved", async () => {
    const mockOrder: Order = {
      ticketID: "t1",
      orderID: "o1",
      quantity: 2,
      userID: "u1",
      eventID: "e1",
      totalPrice: 100,
      createdAt: new Date(),
      status: OrderStatus.PENDING,
    };

    const mockRepo: OrderRepository = {
      createOrder: jest.fn(),
      getOrderByID: jest.fn().mockResolvedValue(mockOrder),
      updateStatus: jest.fn().mockImplementation(async (id, status) => {
        mockOrder.status = status;
        return status;
      }),
    };

    const consumer = new OrderConsumer(mockRepo);

    const message = {
      value: JSON.stringify({ orderID: "o1" }),
    };

    await consumer.handleTicketReserved(message);

    expect(mockOrder.status).toBe(OrderStatus.CONFIRMED);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith(
      "o1",
      OrderStatus.CONFIRMED
    );
  });

  it("cancels order when ticket out of stock", async () => {
    const mockOrder: Order = {
      ticketID: "t1",
      orderID: "order456",
      quantity: 2,
      userID: "u1",
      eventID: "e1",
      totalPrice: 100,
      createdAt: new Date(),
      status: OrderStatus.PENDING,
    };

    const mockRepo: OrderRepository = {
      createOrder: jest.fn(),
      getOrderByID: jest.fn().mockResolvedValue(mockOrder),
      updateStatus: jest.fn().mockImplementation(async (id, status) => {
        mockOrder.status = status;
        return status;
      }),
    };

    const consumer = new OrderConsumer(mockRepo);

    const message = {
      value: JSON.stringify({ orderID: "order456" }),
    };

    await consumer.handleTicketOutOfStock(message);

    expect(mockOrder.status).toBe(OrderStatus.FAILED);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith(
      "order456",
      OrderStatus.FAILED
    );
  });
});
