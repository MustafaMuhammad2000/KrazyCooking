const request = require('supertest');
const express = require('express');
const router = require('../routes/userRoutes.js');

const app = new express();
app.use('/', router);

describe('User Routes', function () {

  test('responds to /register', async () => {
    const res = await request(app).post('/register');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /login', async () => {
    const res = await request(app).post('/login'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /uploadProfilePic', async () => {
    const res = await request(app).post('/uploadProfilePic'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /updatePassword', async () => {
    const res = await request(app).patch('/updatePassword'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /checkImage', async () => {
    const res = await request(app).get('/checkImage'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /getUser', async () => {
    const res = await request(app).get('/getUser'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('Welcome');
  });

  

});