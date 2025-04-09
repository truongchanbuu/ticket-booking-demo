import OrderService from "@/services/order.service";

// order.consumer.ts
type KafkaMessage = { value: string };

export default class OrderConsumer {
  constructor(private orderService: OrderService) {}

  public async handleTicketReserved(message: KafkaMessage) {
    throw new Error("Unimplemented method");
  }

  public async handleTicketOutOfStock(message: KafkaMessage) {
    throw new Error("Unimplemented method");
  }
}
