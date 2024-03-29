import { Router } from 'express';
import authRouter from './auth';
import cartRouter from './cart';
import categoryRouter from './category';
import orderRouter from './orders';
import productRouter from './products';
import reviewRouter from './reivew';
import studentRouter from './students';
import subCategoryRouter from './subcategory';
import paymentRouter from './payment';

const baseRouter = Router();

baseRouter.use('/products', productRouter);
baseRouter.use('/orders', orderRouter);
baseRouter.use('/students', studentRouter);
baseRouter.use('/category', categoryRouter);
baseRouter.use('/reviews', reviewRouter);
baseRouter.use('/subcategory', subCategoryRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/cart', cartRouter);
baseRouter.use('/payment', paymentRouter);
baseRouter.get('/health', (req, res) => {
	res.send('OK');
});

export default baseRouter;
