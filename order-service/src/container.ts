import OrderController from "@/controllers/order.controller";
import { OrderRepositoryImpl } from "@/repositories/order.repository.impl";
import OrderService from "@/services/order.service";

const orderRepo = new OrderRepositoryImpl();
const orderService = new OrderService(orderRepo);
const orderController = new OrderController(orderService);

export { orderController };
