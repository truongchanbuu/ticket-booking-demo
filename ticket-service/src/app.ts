import express from "express";
import { ticketRouter } from "./container"; // Production router

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/tickets", ticketRouter);

  return app;
}
