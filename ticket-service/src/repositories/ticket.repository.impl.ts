import db from '@/firestore.config';
import Ticket from '@/models/ticket.model';
import TicketRepository from './ticket.repository';

export default class TicketRepositoryImpl implements TicketRepository {
  private ticketCollection = db.collection('tickets');

  async createTicket(ticket: Ticket): Promise<Ticket> {
    try {
      const docRef = this.ticketCollection.doc(ticket.ticketID);
      await docRef.set(ticket);

      const createdTicket = await this.getTicketByID(ticket.ticketID);

      if (!createdTicket) {
        throw new Error('Failed to create ticket');
      }

      return createdTicket;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const snapshot = await this.ticketCollection.get();
      return snapshot.docs.map((doc) => doc.data() as Ticket);
    } catch (error) {
      console.error('Error finding all tickets:', error);
      throw error;
    }
  }

  async getTicketByID(ticketID: string): Promise<Ticket> {
    try {
      const docRef = this.ticketCollection.doc(ticketID);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new Error(`Ticket with ID ${ticketID} not found`);
      }

      return doc.data() as Ticket;
    } catch (error) {
      console.error(`Error getting ticket ${ticketID}:`, error);
      throw error;
    }
  }
}
