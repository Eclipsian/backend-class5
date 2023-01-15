import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryBySlug, updateCategory, } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:slug', getCategoryBySlug)
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.put('/:id', updateCategory);

export default categoryRouter;
