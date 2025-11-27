import request from 'supertest';
import express from 'express';
import bugRoutes from '../routes/bugs.js';
import mongoose from 'mongoose';
import Bug from '../models/Bug.js';

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test_bug_tracker');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Bug API', () => {
  let bugId;

  it('should create a bug', async () => {
    const res = await request(app).post('/api/bugs').send({ title: 'Test bug' });
    bugId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test bug');
  });

  it('should get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update bug status', async () => {
    const res = await request(app).put(`/api/bugs/${bugId}`).send({ status: 'resolved' });
    expect(res.body.status).toBe('resolved');
  });

  it('should delete a bug', async () => {
    const res = await request(app).delete(`/api/bugs/${bugId}`);
    expect(res.body.message).toBe('Deleted successfully');
  });
});
