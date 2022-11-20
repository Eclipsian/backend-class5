import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory, } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById)
categoryRouter.post('/', createCategory);
categoryRouter.delete('/', deleteCategory);
categoryRouter.put('/', updateCategory);

export default categoryRouter;
