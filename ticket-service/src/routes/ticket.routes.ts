import { Router } from "express";
import { getExample } from "../controllers/ticket.controller";

const ticketRouter = Router();

ticketRouter.get("/", getExample);

export default ticketRouter;
