import express from "express";
import ticketRouter from "./routes/ticket.routes";

const app = express();
app.use(express.json());
app.use("/tickets", ticketRouter);

export default app;
