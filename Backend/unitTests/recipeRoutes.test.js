const request = require('supertest');
const dotenv = require("dotenv");

dotenv.config();

const baseURL = process.env.BASEURL + '/recipe';

describe('Recipe Routes', function () {

  var token = '';
  const pid = '64134c6f84de83bc075d329e';
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

    const res2 = await request(process.env.BASEURL+'/post').get('/'+pid+'/view'); 
    originalCount = res2.body.recipes.length;
    console.log(originalCount);
    expect(res2.statusCode).toBe(200);

  });

  // rcr-1 Posting a recipe with no picture on an non-existing post with proper authorization
  test('Posting a recipe on an invalid post', async () => {
    const body = {
      body: "1. add chicken \n 2. add sour patch kids"
    }
    
    const res = await request(baseURL).post('/64176b74923a7a558924433b').send(body).set('authorization', token);

    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  }); 

  // rcr-2 Posting a recipe with no picture on an invalid Post ID with proper authorization
  test('Posting a recipe on an invalid post', async () => {
    const body = {
      body: "1. add chicken \n 2. add sour patch kids"
    }
    
    const res = await request(baseURL).post('/lol').send(body).set('authorization', token);

    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  }); 

  // rcr-3 Posting a recipe with no picture on a valid post without proper authorization
  test('Posting a recipe on a recipe without authorization', async () => {
    const body = {
      body: "1. add chicken \n 2. add sour patch kids"
    }
    
    const res = await request(baseURL).post('/'+ pid).send(body);

    console.log(res.body);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(401);
  }); 

  var rcid = '';
  // rcr-4 Posting a recipe with no picture on a valid post with proper authorization
  test('Posting a recipe on a valid post', async () => {
    const body = {
      body: "1. add chicken \n 2. add sour patch kids"
    }
    
    const res = await request(baseURL).post('/'+ pid).send(body).set('authorization', token);

    rcid = res.body.recipe._id;
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  }); 

  // rcr-5 Deleting a recipe from a valid post with a valid Post ID with the wrong authorization
  test('Deleting recipe that is not yours', async () => {

    const body = {
      username: "test1",
      password: "test2"
    }
    const res = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    const wrongToken = res.body.token;
    console.log(token);
    expect(res.statusCode).toBe(200);

    const res2 = await request(baseURL).delete('/'+rcid).set('authorization', wrongToken);

    // Delete the recipe itself
    console.log(res.body);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(400);
  });

  // rcr-6 Deleting a recipe from a valid post
  test('Deleting recipe from a valid post', async () => {
  
    // Delete the recipe itself
    const res = await request(baseURL).delete('/'+rcid).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);

    // rcr-7 Verify that it is no longer on the post
    const res2 = await request(process.env.BASEURL+'/post').get('/'+pid+'/view'); 
    const count = res2.body.recipes.length;
    console.log(count);

    const recipeArray = res2.body.recipes;
    
    var recipeOnPost = false;
    for(var i = 0; i < recipeArray.length; i++) {
      if(recipeArray[i]._id==rcid) recipeOnPost = true;
    }
    
    expect(res2.statusCode).toBe(200);
    expect(recipeOnPost).toBe(false);
    expect(count).toBe(originalCount);
  }); 

  // rcr-8 Deleting a recipe that doesn't exist
  test('Deleting a recipe that doesn\'t exist', async () => {
    
    // Delete the recipe itself
    const res = await request(baseURL).delete('/'+rcid).set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
 
  }); 

  // rcr-9 Deleting an invalid recipe ID 
  test('Deleting an invalid recipe', async () => {
    
    // Delete the recipe itself
    const res = await request(baseURL).delete('/lol').set('authorization', token);
    console.log(res.body);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
 
  }); 

  

}); 