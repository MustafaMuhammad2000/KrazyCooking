const request = require('supertest');
const dotenv = require("dotenv");
dotenv.config();

postURL = process.env.BASEURL + '/post';
var testPostID;
var token;

describe('Read Post Routes', function () {

  // Before tests, login to an account to get authorization token
  beforeAll(async() => {
    const body = {
      username: "test1",
      password: "test2"
    }
    const res = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    token = res.body.token;
    console.log(token);
  });

  // router.get("/", getAllPosts);
  // pr-1 Getting all the data in posts from the database
  test('Getting all the data in posts from the database', async () => {
    const res = await request(postURL).get('/'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // router.get("/:pid/view", getPost);
  // pr-2 Find and view post with valid Post ID 
  test('Find and view post with valid Post ID', async () => {
    // Create a post for the purpose of this test
    const body = {
      title: "Post Routes Test Post 1",
      body: "Turkey stuffed with a duck stuffed with a goose",
      tags: ["Turkey", "Duck", "Goose", "Bird"]
    }
    const res = await request(process.env.BASEURL + '/post').post('/').set('authorization', token).send(body); 
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);

    testPostID = res.body._id; // ID of the post we just created

    // Getting the single post
    const res2 = await request(postURL).get('/' + testPostID +'/view'); 
    const posts = res.body;
    console.log(posts);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);

    // Deleting the post to avoid clutter
    const res3 = await request(postURL).delete('/'+testPostID).set('authorization', token); 
    expect(res3.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res3.statusCode).toBe(200);
  });

  // pr-3 Find post with invalid Post ID 
  test('Find post with invalid Post ID', async () => {
    const res = await request(postURL).get('/junk/view'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  // pr-4 Find post with non-existent Post ID 
  test('Find post with non-existent Post ID', async () => {
    const res = await request(postURL).get('/6411426bc0af3ce9950438f2/view'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  // router.get("/random", getRandomPost);
  // pr-5 Get random post
  test('Get random post', async () => {
    const res = await request(postURL).get('/random'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // router.get("/search", searchPosts);
  // pr-7 Find posts with search term "cheese"
  test('Find posts with search term cheese', async () => {
    const res = await request(postURL).get('/search?q=cheese'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-8 Find posts with empty search term
  test('Find posts with empty search term', async () => {
    const res = await request(postURL).get('/search?q='); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-9 Find posts with search term including special characters
  test('Find posts with search term including special characters', async () => {

    const res = await request(postURL).get('/search?q=potato+@+corn+#+syrup');
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200); 
  });

  // pr-10 Find posts with multiple search terms
  test('Find posts with multiple search terms', async () => {
    const res = await request(postURL).get('/search?q=cheese+salad'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-10.5 Get tag of the month
  test('Get tag of the month', async () => {
    const res = await request(postURL).get('/tagofmonth'); 
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

});

describe('Write Post Routes', function () {

   // Before tests, login to an account to get authorization token
  var token = '';
  var pid = '';

   beforeAll(async() => {
    const body = {
      username: "test1",
      password: "test2"
    }
    const res = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    token = res.body.token;
    console.log(token);
  });

  // router.post("/", verifyToken, upload.single("image"), validatePost, createPost);
  // pr-11 Create new post with all valid data and proper authorization token
  test('Create new post with all valid data and proper authorization token', async () => {
    const body = {
      title: "Unit Test Post",
      body: "Test body",
      tags: ["test", "post"]
    }
    const res = await request(postURL).post('/').set('authorization', token).send(body); 
    const posts = res.body;
    pid = res.body._id;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  // pr-12 Create post with all empty fields
  test('Create post with all empty fields', async () => {
    const body = {
      title: '',
      body: '',
      tags: []
    }
    const res = await request(postURL).post('/').set('authorization', token).send(body); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  // pr-13 Create new post with all valid data and but no authorization token
  test('Create new post with all valid data and but no authorization token', async () => {
    const body = {
      title: "Unit Test Post",
      body: "Test body",
      tags: ["test", "post"]
    }
    const res = await request(postURL).post('/').send(body); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(401);
  });

  // router.put("/:pid/upvote", verifyToken, upvotePost);
  // pr-14 Upvote post with proper authorization and valid Post ID
  test('Upvote post with proper authorization and valid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-15 Upvote post with proper authorization and valid Post ID but a second time
  test('Upvote post with proper authorization and valid Post ID but a second time', async () => {
    const res = await request(postURL).put('/'+pid+'/upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  // router.put("/:pid/remove-upvote", verifyToken, removeUpvote);
  // pr-16 Remove upvote on post with proper authorization and valid Post ID
  test('Remove upvote on post with proper authorization and valid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/remove-upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-17 Remove upvote on post with proper authorization and valid Post ID but a second time
  test('Remove upvote on post with proper authorization and valid Post ID but a second time', async () => {
    const res = await request(postURL).put('/'+pid+'/remove-upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  // pr-18 Upvote post with invalid authorization but valid Post ID
  test('Upvote post with invalid authorization but valid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/upvote'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(401);
  });

  // pr-19 Remove upvote on post without proper authorization but valid Post ID
  test('Remove upvote on post without proper authorization but valid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/remove-upvote'); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(401);
  });

  // router.delete("/:pid", verifyToken, deletePost);
  // pr-20 Delete post with valid Post ID but wrong authorization token
  test('Delete post with valid Post ID but wrong authorization token', async () => {
    const body = {
      username: "postTest",
      password: "password"
    }
    const res1 = await request(process.env.BASEURL+'/user').post('/login').send(body); 
    var wrongToken = res1.body.token;
    console.log(wrongToken);

    const res2 = await request(postURL).delete('/'+pid).set('authorization', wrongToken); 
    const posts = res2.body;
    console.log(posts);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(400);
  });

  // pr-21 Delete post with valid Post ID and proper authorization token
  test('Delete post with valid Post ID and proper authorization token', async () => {
    const res = await request(postURL).delete('/'+pid).set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // pr-22 Delete post with invalid Post ID and proper authorization token
  test('Delete post with invalid Post ID and proper authorization token', async () => {
    const res = await request(postURL).delete('/'+pid).set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
  

   // pr-23 Delete post with invalid Post ID
   test('Delete post with invalid Post ID', async () => {
    const res = await request(postURL).delete('/lol').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
  });

  // pr-24 Delete post with non-existing Post ID
  test('Delete post with non-existing Post ID', async () => {
    const res = await request(postURL).delete('/6411426bc0af3ce9950438f2').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  // pr-25 Upvote post with valid authorization but invalid Post ID
  test('Upvote post with valid authorization but invalid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  // pr-26 Remove upvote on post with proper authorization but invalid Post ID
  test('Remove upvote on post with proper authorization but invalid Post ID', async () => {
    const res = await request(postURL).put('/'+pid+'/remove-upvote').set('authorization', token); 
    const posts = res.body;
    console.log(posts);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });


});