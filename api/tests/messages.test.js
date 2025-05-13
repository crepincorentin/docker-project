jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
  };
  return {
    Pool: jest.fn(() => mClient),
  };
});

const request = require('supertest');
const app = require('../app');
const { Pool } = require('pg');

describe('API /messages', () => {
  const pool = new Pool();

  beforeEach(() => {
    pool.query.mockClear();
  });

  it('GET /messages should return a list of messages', async () => {
    const mockMessages = [
      {
        id: 1,
        pseudo: 'Test',
        content: 'Hello',
        created_at: new Date().toISOString(),
      },
    ];
    pool.query.mockResolvedValueOnce({ rows: mockMessages });

    const res = await request(app).get('/messages');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockMessages);
  });

  it('POST /messages should create a message', async () => {
    const message = { pseudo: 'Alice', content: 'Hello world' };
    const createdMessage = { ...message, id: 2, created_at: new Date() };

    pool.query.mockResolvedValueOnce({ rows: [createdMessage] });

    const res = await request(app).post('/messages').send(message);
    expect(res.statusCode).toBe(201);
    expect(res.body.pseudo).toBe('Alice');
    expect(res.body.content).toBe('Hello world');
  });
});
