import { injectable, inject } from 'tsyringe';
import { Product, Prisma } from '@prisma/client';
import { ProductRepository } from '../repositories/product.repository';
import { AppError } from '../middlewares/error';

@injectable()
export class ProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.productRepository.create(data);
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    try {
      const product = await this.productRepository.update(id, data);

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update product', 500);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.delete(id);

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete product', 500);
    }
  }
}
