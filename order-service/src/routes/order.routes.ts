import { orderController } from "@/container";
import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);

export default orderRouter;
