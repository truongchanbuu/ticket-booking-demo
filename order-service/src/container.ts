import OrderController from "@/controllers/order.controller";
import OrderProducer from "@/producers/order.producer";
import { OrderRepositoryImpl } from "@/repositories/order.repository.impl";
import OrderService from "@/services/order.service";

const orderProducer = new OrderProducer();
const orderRepo = new OrderRepositoryImpl();
const orderService = new OrderService(orderRepo, orderProducer);
const orderController = new OrderController(orderService);

export { orderController };
