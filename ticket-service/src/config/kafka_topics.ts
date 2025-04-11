import { AppConstants } from './constants';

export const KafkaTopics = {
  TICKET_CREATED: `${AppConstants.KAFKA_CLIENT_ID}.ticket.created`,
  TICKET_UPDATED: `${AppConstants.KAFKA_CLIENT_ID}.ticket.updated`,
};
