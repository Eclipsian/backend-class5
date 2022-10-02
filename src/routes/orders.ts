import { Router } from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/orders';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/', createOrder)
orderRouter.delete('/', deleteOrder)
orderRouter.put('/', updateOrder)
orderRouter.get('/:id', getOrderById)

export default orderRouter;