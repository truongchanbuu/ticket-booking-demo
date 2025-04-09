import express from "express";
import bodyParser from "body-parser";
import OrderController from "@/controllers/order.controller";
import OrderService from "@/services/order.service";

export function createTestApp(orderService: OrderService) {
  const app = express();
  app.use(bodyParser.json());

  const controller = new OrderController(orderService);
  app.post("/orders", (req, res) => controller.createOrder(req, res));

  return app;
}
