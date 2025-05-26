import request from 'supertest';
import { app } from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Endpoints', () => {
  let userId: string;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      }
    });
    
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/users');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body).toHaveProperty('meta');
      expect(res.body).toHaveProperty('links');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const res = await request(app).get(`/users/${userId}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id', userId);
      expect(res.body.data).toHaveProperty('email', 'test@example.com');
      expect(res.body.data).toHaveProperty('name', 'Test User');
      expect(res.body.data).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('links');
    });

    it('should return 404 if user is not found', async () => {
      const res = await request(app).get('/users/nonexistent-id');
      
      expect(res.status).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password456'
      };
      
      const res = await request(app)
        .post('/users')
        .send(userData);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('email', userData.email);
      expect(res.body.data).toHaveProperty('name', userData.name);
      expect(res.body.data).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('links');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', async () => {
      const updateData = {
        email: 'updated@example.com',
        name: 'Updated User',
        password: 'newpassword'
      };
      
      const res = await request(app)
        .put(`/users/${userId}`)
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id', userId);
      expect(res.body.data).toHaveProperty('email', updateData.email);
      expect(res.body.data).toHaveProperty('name', updateData.name);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should partially update a user', async () => {
      const patchData = {
        name: 'Partially Updated User'
      };
      
      const res = await request(app)
        .patch(`/users/${userId}`)
        .send(patchData);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id', userId);
      expect(res.body.data).toHaveProperty('email', 'updated@example.com');
      expect(res.body.data).toHaveProperty('name', patchData.name);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app).delete(`/users/${userId}`);
      
      expect(res.status).toBe(204);
      
      const checkRes = await request(app).get(`/users/${userId}`);
      expect(checkRes.status).toBe(404);
    });
  });
});