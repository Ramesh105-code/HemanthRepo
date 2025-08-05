const request = require('supertest');
const app = require('./app');

describe('To-Do API - Edge Cases', () => {
  it('should return 404 when updating a non-existent todo', async () => {
    const res = await request(app).put('/todos/99999').send({ task: 'Fake update' });
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Not found');
  });

  it('should handle empty task creation', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('id');
  });

  it('should handle deletion of non-existent todo gracefully', async () => {
    const res = await request(app).delete('/todos/99999');
    expect(res.statusCode).toBe(204); 
  });
});
