import { Router } from 'express';
import { getAllOrders } from '../controllers/orders';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);

export default orderRouter