import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts } from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct)
productRouter.delete('/', deleteProduct)


export default productRouter