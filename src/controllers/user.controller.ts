import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../services/user.service';
import { formatResponse } from '../utils/response';

export class UserController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve('UserService') as UserService;
    const users = await userService.findAll();
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    return res.json(
      formatResponse(
        users,
        { count: users.length },
        {
          self: baseUrl,
        }
      )
    );
  }
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve('UserService') as UserService;
    const user = await userService.findById(id);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    return res.json(
      formatResponse(user, undefined, {
        self: `${baseUrl}/${id}`,
        related: {
          products: `${req.protocol}://${req.get('host')}/products?userId=${id}`,
        },
      })
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve('UserService') as UserService;
    const user = await userService.create(req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.status(201).json(
      formatResponse(user, undefined, {
        self: `${baseUrl}/${user.id}`,
      })
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve('UserService') as UserService;
    const user = await userService.update(id, req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(user, undefined, {
        self: `${baseUrl}/${id}`,
      })
    );
  }

  async partialUpdate(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve('UserService') as UserService;
    const user = await userService.update(id, req.body);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    return res.json(
      formatResponse(user, undefined, {
        self: `${baseUrl}/${id}`,
      })
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve('UserService') as UserService;
    await userService.delete(id);

    return res.status(204).send();
  }
}
