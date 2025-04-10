// src/mappers/ticket.mapper.ts
import { CreateTicketDto } from "@/dtos/create_ticket.dto";
import Ticket from "@/models/ticket.model";

export class TicketMapper {
  public static fromCreateDto(dto: CreateTicketDto): Ticket {
    return {
      ticketID: this.getTicketID(dto.eventOrganizerID, dto.eventID),
      eventOrganizerID: dto.eventOrganizerID,
      eventID: dto.eventID,
      ticketName: dto.ticketName,
      ticketDescription: dto.ticketDesc,
      ticketType: dto.ticketType,
      ticketBasePrice: dto.ticketBasePrice,
      ticketDiscount: dto.ticketDiscount ?? 0,
      maxAvailable: dto.count,
      remaining: dto.count,
      sold: 0,
      createdAt: new Date(),
      finalPrice: 0,
    };
  }

  private static getTicketID = (eventOrgID: string, eventID: string) =>
    `TK-${eventOrgID}-${eventID}-${Date.now()}`;
}
