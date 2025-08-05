const request = require('supertest');
const app = require('./app');

describe('To-Do API', () => {
  let todoId;

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Learn Jest' });

    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe('Learn Jest');
    todoId = res.body.id;
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ task: 'Learn Jest and Supertest' });

    expect(res.statusCode).toBe(200);
    expect(res.body.task).toBe('Learn Jest and Supertest');
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(204);
  });
});
