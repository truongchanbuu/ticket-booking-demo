import OrderRepository from "@/repositories/order.repository";

// order.consumer.ts
type KafkaMessage = { value: string };

export default class OrderConsumer {
  constructor(private orderRepo: OrderRepository) {}

  async handleTicketReserved(message: KafkaMessage) {
    throw new Error("Unimplemented method");
  }

  async handleTicketOutOfStock(message: KafkaMessage) {
    throw new Error("Unimplemented method");
  }
}
