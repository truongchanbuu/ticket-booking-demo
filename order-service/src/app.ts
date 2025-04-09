import express from "express";
import orderRouter from "./routes/order.routes";

const app = express();
app.use(express.json());
app.use("/orders", orderRouter);

export default app;
