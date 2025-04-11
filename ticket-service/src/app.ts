import express from 'express';
import { createContainer } from './container';

export async function createApp() {
  const app = express();

  app.use(express.json());

  const { routers } = await createContainer();
  app.use('/tickets', routers.ticketRouter);

  return app;
}
