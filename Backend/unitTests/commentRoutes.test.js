const request = require('supertest');
const express = require('express');
const router = require('../routes/commentRoutes.js');

const app = new express();
app.use('/', router);

describe('Comment Routes', function () {
  
  test('responds to /:pid', async () => {
    const res = await request(app).post('/:pid'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /:cid', async () => {
    const res = await request(app).delete('/:cid');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});