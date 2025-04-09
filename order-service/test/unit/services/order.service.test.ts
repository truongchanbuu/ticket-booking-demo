import { OrderStatus } from "@/enums/order_status";
import Order from "@/models/order.model";
import OrderRepository from "@/repositories/order.repository";
import OrderService from "@/services/order.service";

describe("OrderService - bookTicket()", () => {
  it("should create order and send event", async () => {
    const kafkaTopic = "order_created";
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
      createOrder: jest.fn().mockResolvedValue(mockOrder),
      updateStatus: jest.fn(),
      getOrderByID: jest.fn(),
    };

    const mockKafkaProducer = {
      send: jest.fn().mockResolvedValue(undefined),
    };

    const service = new OrderService(mockRepo, mockKafkaProducer);

    const result = await service.bookTicket("u1", "e1", "t1", 2);

    expect(result).toBe(mockOrder);
    expect(mockKafkaProducer.send).toHaveBeenCalledWith(kafkaTopic, mockOrder);

    expect(mockRepo.createOrder).toHaveBeenCalledWith("u1", "e1", "t1", 2);
  });
});
