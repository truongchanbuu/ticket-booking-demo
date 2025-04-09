// tests/order.service.test.ts

import { OrderRepository } from "@/repositories/order.repository";
import { OrderService } from "@/services/order.service";

describe("OrderService - bookTicket()", () => {
  it("should create order and decrease ticket if available", async () => {
    const mockRepo: OrderRepository = {
      getRemainingTickets: jest.fn().mockResolvedValue(5),
      decreaseTickets: jest.fn().mockResolvedValue(undefined),
      createOrder: jest.fn().mockResolvedValue({
        id: "123",
        userId: "u1",
        eventId: "e1",
        status: "confirmed",
      }),
    };

    const service = new OrderService(mockRepo);

    const result = await service.bookTicket("u1", "e1");

    expect(result.status).toBe("confirmed");
    expect(mockRepo.getRemainingTickets).toHaveBeenCalledWith("e1");
    expect(mockRepo.decreaseTickets).toHaveBeenCalledWith("e1", 1);
    expect(mockRepo.createOrder).toHaveBeenCalledWith("u1", "e1");
  });
});
