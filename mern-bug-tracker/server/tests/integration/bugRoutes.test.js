const request = require('supertest');
const mongoose = require('mongoose');
const Bug = require('../../src/models/bugModel');
const User = require('../../src/models/userModel');
const app = require('../../src/index');

let token;

beforeAll(async () => {
  const MONGO_TEST_URI = 'mongodb://127.0.0.1:27017/bugtracker_test';
  await mongoose.connect(MONGO_TEST_URI);
});

beforeEach(async () => {
  await Bug.deleteMany();
  await User.deleteMany();

  // Create and login test user
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

  token = userRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bug API Integration (with Auth)', () => {
  test('POST /api/bugs - should create a new bug', async () => {
    const bugData = { title: 'Bug A', description: 'Example bug' };

    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send(bugData);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(bugData.title);
    expect(res.body.status).toBe('open');
  });

  test('GET /api/bugs - should return all bugs', async () => {
    await Bug.create([
      { title: 'Bug1', description: 'desc1' },
      { title: 'Bug2', description: 'desc2' }
    ]);

    const res = await request(app)
      .get('/api/bugs')
      .set('Authorization', `Bearer ${token}`); // Add this if GET is protected

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('PUT /api/bugs/:id - should update a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'desc' });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'resolved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id - should delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'desc' });

    const res = await request(app)
      .delete(`/api/bugs/${bug._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});