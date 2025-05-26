import { UserService } from '../../../src/services/user.service';
import { UserRepository } from '../../../src/repositories/user.repository';
import { AppError } from '../../../src/middlewares/error';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockProxy<UserRepository>;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userService = new UserService(userRepository);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userRepository.findAll.mockResolvedValue([mockUser]);

      const result = await userService.findAll();

      expect(result).toEqual([mockUser]);
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.findById('1');

      expect(result).toEqual(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.findById('1')).rejects.toThrow(AppError);
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password'
      };
      userRepository.create.mockResolvedValue({ ...mockUser, ...userData });

      const result = await userService.create(userData);

      expect(result).toEqual({ ...mockUser, ...userData });
      expect(userRepository.create).toHaveBeenCalledWith(userData);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = { name: 'Updated Name' };
      userRepository.update.mockResolvedValue({ ...mockUser, ...updateData });

      const result = await userService.update('1', updateData);

      expect(result).toEqual({ ...mockUser, ...updateData });
      expect(userRepository.update).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw an error if user to update is not found', async () => {
      userRepository.update.mockResolvedValue(null);

      await expect(userService.update('1', { name: 'New Name' })).rejects.toThrow(AppError);
      expect(userRepository.update).toHaveBeenCalledWith('1', { name: 'New Name' });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      userRepository.delete.mockResolvedValue(mockUser);

      const result = await userService.delete('1');

      expect(result).toEqual(mockUser);
      expect(userRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user to delete is not found', async () => {
      userRepository.delete.mockResolvedValue(null);

      await expect(userService.delete('1')).rejects.toThrow(AppError);
      expect(userRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});