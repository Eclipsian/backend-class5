import { Router } from 'express';
import { getAllProducts } from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);

export default productRouter