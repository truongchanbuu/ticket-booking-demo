import { Router } from "express";
import { getExample } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/", getExample);

export default orderRouter;
