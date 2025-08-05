const request = require('supertest');
const app = require('../../app'); 

describe('🔁 Integration: To-Do API', () => {
  let id;

  it(' should create a todo', async () => {
    const res = await request(app).post('/todos').send({ task: 'Integration Test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe('Integration Test');
    id = res.body.id;
  });

  it(' should read all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it(' should update the todo', async () => {
    const res = await request(app).put(`/todos/${id}`).send({ task: 'Updated Task' });
    expect(res.statusCode).toBe(200);
    expect(res.body.task).toBe('Updated Task');
  });

  it(' should delete the todo', async () => {
    const res = await request(app).delete(`/todos/${id}`);
    expect(res.statusCode).toBe(204);
  });
});
