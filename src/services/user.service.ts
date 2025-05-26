import { injectable, inject } from 'tsyringe';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../middlewares/error';

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // In a real application, you would hash the password here
    return this.userRepository.create(data);
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      const user = await this.userRepository.update(id, data);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user', 500);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const user = await this.userRepository.delete(id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete user', 500);
    }
  }
}
