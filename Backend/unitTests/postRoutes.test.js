const request = require('supertest');
const express = require('express');
const router = require('../routes/postRoutes.js');

const app = new express();
app.use('/', router);

describe('Post Routes', function () {

  test('responds to /', async () => {
    const res = await request(app).post('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /:pid', async () => {
    const res = await request(app).delete('/:pid'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /:pid', async () => {
    const res = await request(app).get('/:pid'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});