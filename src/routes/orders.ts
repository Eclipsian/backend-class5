import { Router } from 'express';
import { createOrder, deleteOrder, getAllOrders } from '../controllers/orders';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/', createOrder)
orderRouter.delete('/', deleteOrder)

export default orderRouter;