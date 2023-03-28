const request = require('supertest');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

const baseURL = process.env.BASEURL + '/review';

describe('Review Routes', function () {

  var token = '';
  var adminToken = '';
  var pid = '';
  var rcid = '';
  var reid = '';

  // Relative path of the test image
  const testImage = path.resolve('unitTests/chicken_salad.jpg');
  console.log(testImage);
  
  var originalCount;
  
  // Before tests, login to an account to get authorization token
  beforeAll(async() => {
    const body = {
      username: "postTest",
      password: "password"
    }
    const res = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    token = res.body.token;
    console.log(token);
    expect(res.statusCode).toBe(200);

    // Create a post for the purpose of these tests
    const body2 = {
      title: "Review Routes Test Post 1",
      body: "Turkey stuffed with a duck stuffed with a goose",
      tags: ["Turkey", "Duck", "Goose", "Bird"]
    }
    const res2 = await request(process.env.BASEURL + '/post').post('/').set('authorization', token).send(body2); 
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);
    pid = res2.body._id; // ID of the post we just created

    // Add a recipe to the post for the purpose of these tests
    const body3 = {
      body: "1. Stuff a duck with a goose \n 2. Stuff a turkey with the duck"
    }
    const res3 = await request(process.env.BASEURL + '/recipe').post('/'+ pid).send(body3).set('authorization', token);
    expect(res3.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res3.statusCode).toBe(201);
    rcid = res3.body.recipe._id;

    // Retrieving the number of reviews on the recipe on the post
    const res4 = await request(process.env.BASEURL+'/post').get('/'+pid+'/view'); 
    originalCount = res4.body.recipes[0].reviews.length;
    console.log(originalCount);
    expect(res4.statusCode).toBe(200);
  }, 10000);

  // rer-1 Posting a review on a valid recipe with no picture
  test('Posting a review with no picture', async () => {
    const res = await request(baseURL).post('/'+ rcid).field('body', 'hello').field('rating', 4).set('authorization', token);

    // Review without an image should give a 400
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  }); 

  // rer-2 Posting a review on an invalid recipe ID with proper authorization
  test('Posting a review on an invalid recipe', async () => {   
    const res = await request(baseURL).post('/lol').attach('image', testImage).field('body', 'hello').field('rating', 4).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  }); 

  // rer-3 Posting a review on a non-existing recipe ID with proper authorization
  test('Posting a review on an non-existent recipe', async () => {   
    const res = await request(baseURL).post('/6411426bc0af3ce9950438f2').attach('image', testImage).field('body', 'hello').field('rating', 4).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  }); 

  // rer-4 Posting a review picture on a valid recipe without proper authorization
  test('Posting a review on a recipe without authorization', async () => {
    const res = await request(baseURL).post('/'+ rcid).attach('image', testImage).field('body', 'hello').field('rating', 4);

    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(401);
  }); 

  // rer-5 Posting a review on a valid recipe with proper authorization
  test('Posting a review on a valid recipe', async () => {
    const res = await request(baseURL).post('/'+ rcid).attach('image', testImage).field('body', 'hello').field('rating', 4).set('authorization', token);
    reid = res.body._id;
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  }); 


  // rer-6 Deleting a review from a valid recipe with a valid recipe ID with the wrong authorization
  test('Deleting review that is not yours', async () => {

    const body = {
      username: "test1",
      password: "test2"
    }
    const res = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    const wrongToken = res.body.token;
    console.log(token);
    expect(res.statusCode).toBe(200);

    const res2 = await request(baseURL).delete('/'+reid).set('authorization', wrongToken);

    // Attempt to delete the review
    console.log(res.body);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(400);
  });


  // rer-7 Deleting a review from a valid recipe
  test('Deleting review from a valid recipe', async () => {
  
    // Delete the review itself
    const res = await request(baseURL).delete('/'+reid).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);

    // Verify that it is no longer on the recipe
    const res2 = await request(process.env.BASEURL+'/post').get('/'+pid+'/view'); 
    const count = res2.body.recipes[0].reviews.length;
    console.log(count);

    const reviewArray = res2.body.recipes[0].reviews;
    
    var reviewOnPost = false;
    for(var i = 0; i < reviewArray.length; i++) {
      if(reviewArray[i]._id==rcid) reviewOnPost = true;
    }
    
    expect(res2.statusCode).toBe(200);
    expect(reviewOnPost).toBe(false);
    expect(count).toBe(originalCount);
  }); 

  // rer-8 Deleting a review that doesn't exist
  test('Deleting a review that doesn\'t exist', async () => {
    
    // Delete the review itself
    const res = await request(baseURL).delete('/'+reid).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
 
  }); 

  // rer-9 Deleting an invalid review ID 
  test('Deleting an invalid review', async () => {
    
    // Delete the review itself
    const res = await request(baseURL).delete('/lol').set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
 
  }); 

  // rer-10 An admin deleting someone else's review 
  test('An admin deleting a review', async () => {

    // Posting a review as a regular user
    const res = await request(baseURL).post('/'+ rcid).attach('image', testImage).field('body', 'hello').field('rating', 4).set('authorization', token);
    const reid2 = res.body._id;
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);

    // Login to an account which is an admin
    const body = {
      username: "Admin",
      password: "Admin"
    }
    const res2 = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    adminToken = res2.body.token;
    console.log(token);
    expect(res2.statusCode).toBe(200);

    // Delete the review as an admin
    const res3 = await request(baseURL).delete('/'+reid2).set('authorization', adminToken);
    expect(res3.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res3.statusCode).toBe(200);
 
  }); 

  // Delete the test post to avoid cluttering the database
  afterAll(async () => {

    const res = await request(process.env.BASEURL+'/post').delete('/'+pid).set('authorization', adminToken); 
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

}); 