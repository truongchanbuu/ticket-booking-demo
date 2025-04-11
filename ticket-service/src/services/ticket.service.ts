import { CreateTicketDto } from '@/dtos/create_ticket.dto';
import Ticket from '../models/ticket.model';
import TicketRepository from '../repositories/ticket.repository';
import { validate } from 'class-validator';
import { TicketMapper } from '@/mappers/ticket.mapper';
import { Producer } from 'kafkajs';
import { KafkaTopics } from '@/config/kafka_topics';

export class TicketService {
  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly kafkaProducer: Producer
  ) {}

  public async createTicket(data: CreateTicketDto): Promise<Ticket> {
    try {
      const errors = await validate(data);
      if (errors.length > 0) {
        throw new Error('Invalid data passed to service');
      }

      const ticketData: Ticket = TicketMapper.fromCreateDto(data);
      const ticket = await this.ticketRepo.createTicket(ticketData);

      await this.kafkaProducer.send({
        topic: KafkaTopics.TICKET_CREATED,
        messages: [{ value: JSON.stringify(ticket) }],
      });

      return ticket;
    } catch (error) {
      throw new Error(
        `Failed to create tickets: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
