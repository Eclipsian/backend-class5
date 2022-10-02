import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct)
productRouter.delete('/', deleteProduct)
productRouter.put('/', updateProduct)
productRouter.get('/:id', getProductById)

export default productRouter