import { AppConstants } from '@/config/constants';
import { ENV } from '@/config/env';
import { Kafka, Producer } from 'kafkajs';

export default class TicketProducer {
  private kafka: Kafka;
  public readonly producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: AppConstants.KAFKA_CLIENT_ID,
      brokers: [ENV.KAFKA_BROKER],
    });
    this.producer = this.kafka.producer();
  }

  public async connect(): Promise<void> {
    await this.producer.connect();
    console.log('[Kafka] TicketProducer connected');
  }

  public async send(topic: string, message: object): Promise<void> {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
