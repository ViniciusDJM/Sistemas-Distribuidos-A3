import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProductService } from '../services/product.service';
import { formatResponse } from '../utils/response';

export class ProductController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const productService = container.resolve('ProductService') as ProductService;
    const products = await productService.findAll();

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(
        products,
        { count: products.length },
        {
          self: baseUrl,
        }
      )
    );
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve('ProductService') as ProductService;
    const product = await productService.findById(id);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(product, undefined, {
        self: `${baseUrl}/${id}`,
        related: {
          user: product.userId
            ? `${req.protocol}://${req.get('host')}/users/${product.userId}`
            : '',
        },
      })
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const productService = container.resolve('ProductService') as ProductService;
    const product = await productService.create(req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.status(201).json(
      formatResponse(product, undefined, {
        self: `${baseUrl}/${product.id}`,
      })
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve('ProductService') as ProductService;
    const product = await productService.update(id, req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(product, undefined, {
        self: `${baseUrl}/${id}`,
      })
    );
  }

  async partialUpdate(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve('ProductService') as ProductService;
    const product = await productService.update(id, req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(product, undefined, {
        self: `${baseUrl}/${id}`,
      })
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve('ProductService') as ProductService;
    await productService.delete(id);

    return res.status(204).send();
  }
}
