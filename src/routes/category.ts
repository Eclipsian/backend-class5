import { Router } from 'express';
import {
    createCategory, 
    deleteCategory, 
    getAllCategories, 
    updateCategory,
} from '../controllers/category';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/', deleteCategory);
categoryRouter.put('/', updateCategory);

export default categoryRouter;
