import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { cacheMiddleware } from '../middlewares/cache';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', cacheMiddleware, productController.findAll);
productRouter.get('/:id', cacheMiddleware, productController.findById);
productRouter.post('/', productController.create);
productRouter.put('/:id', productController.update);
productRouter.patch('/:id', productController.partialUpdate);
productRouter.delete('/:id', productController.delete);

export { productRouter };
