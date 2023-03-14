const request = require('supertest');
const express = require('express');
const router = require('../routes/reviewRoutes.js');

const app = new express();
app.use('/', router);

describe('Review Routes', function () {

  test('responds to /:cid', async () => {
    const res = await request(app).post('/:cid');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /:rid', async () => {
    const res = await request(app).delete('/:rid'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});