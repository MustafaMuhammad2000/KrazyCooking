const request = require("supertest");
const dotenv = require("dotenv");
const db = require("../Models/DB");
const mongoose = require("mongoose");

const opts = { readPreference: "secondary" };

dotenv.config();

var token;

const baseURL = process.env.BASEURL + "/user";
const testUsername = "userRoutesTest";
const testPassword = "userRoutesPassword";

describe("User Routes", function () {
  /* Unit tests for register route */

  // Trying to register with a username that already exists
  test("Register with username that already exists", async () => {
    const body = {
      admin: false,
      username: "test1",
      password: "password",
      dateOfBirth: new Date(),
    };

    const res = await request(baseURL).post("/register").send(body);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(409);
  }, 10000);

  // ur-1 Register for test account
  test("Register test account", async () => {
    const body = {
      admin: false,
      username: testUsername,
      password: testPassword,
      dateOfBirth: new Date(),
    };

    const res = await request(baseURL).post("/register").send(body);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });

  /* Unit tests for login route */
  // ur-2 Logging in with valid username and password
  test("Logging in with valid username and password", async () => {
    const body = {
      username: testUsername,
      password: testPassword,
    };

    const res = await request(baseURL).post("/login").send(body);
    token = res.body.token;
    console.log(token);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  // ur-3 Logging in without a username or password
  test("Logging in without a username or password", async () => {
    const body = {
      username: "",
      password: "",
    };
    const res = await request(baseURL).post("/login").send(body);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  // ur-4 Logging in with a username that does not exist should return code 401
  test("Logging in with a username that does not exist", async () => {
    const body = {
      username: "thisUsernameDoesNotExist",
      password: "password",
    };
    const res = await request(baseURL).post("/login").send(body);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  // ur-5 Logging in with a valid username but incorrect password should return code 401
  test("Logging in with incorrect password", async () => {
    const body = {
      username: "test1",
      password: "incorrectPassword",
    };
    const res = await request(baseURL).post("/login").send(body);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  /* Unit tests for uploadProfilePic route */

  // ur-6 Upload profile picture without picture
  test("Upload profile picture without providng a picture", async () => {
    const res = await request(baseURL)
      .post("/uploadProfilePic")
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(400);
  });

  /* Unit tests for updatePassword route */

  // ur-7 Updating password with an authorization token
  test("Update password with an authorization token", async () => {
    const body = {
      currentPassword: testPassword,
      newPassword: "updatedPassword",
    };
    const res = await request(baseURL)
      .patch("/updatePassword")
      .send(body)
      .set("authorization", `${token}`);
    // Ensure the update password request was successful
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);

    const body2 = {
      username: testUsername,
      password: "updatedPassword",
    };

    const res2 = await request(baseURL).post("/login").send(body2);
    // Ensure the new password works by attempting to log in with it
    expect(res2.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res2.statusCode).toBe(200);

    const body3 = {
      currentPassword: "updatedPassword",
      newPassword: testPassword,
    };
    const res3 = await request(baseURL)
      .patch("/updatePassword")
      .send(body3)
      .set("authorization", `${token}`);
    // Ensure the password is reverted to the old password
    expect(res3.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res3.statusCode).toBe(200);
  });

  // ur-8 Updating password without an authorization token
  test("Update password without an authorization token", async () => {
    const body = {
      currentPassword: "test2",
      newPassword: "updatedPassword",
    };
    const res = await request(baseURL).patch("/updatePassword").send(body);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  // ur-9 Updating password with an empty body
  test("Update password with an empty body", async () => {
    const body = {
      currentPassword: "",
      newPassword: "",
    };
    const res = await request(baseURL)
      .patch("/updatePassword")
      .send(body)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  /* Unit tests for savePost and savedPosts routes */

  // ur-10 Viewing savedPosts when user has no saved posts
  test("View saved posts with no saved posts", async () => {
    const res = await request(baseURL)
      .get("/savedPosts")
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(404);
  });

  // ur-11 Saving a post that the user does not have saved already
  test("Save a post that is not saved already", async () => {
    const postID = "64114c69fbe11224cfa0b1f6"; // Post 1

    const res = await request(baseURL)
      .post("/savePost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  // ur-12 Saving a post that the user has saved already
  test("Save a post that is saved already", async () => {
    const postID = "64114c69fbe11224cfa0b1f6"; // Trying to save Post 1 again

    const res = await request(baseURL)
      .post("/savePost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(400);
  });

  // ur-13 Viewing savedPosts when user has at least 1 saved post
  test("View saved posts with at least 1 saved post", async () => {
    // Retrieving the user's saved posts
    const res2 = await request(baseURL)
      .get("/savedPosts")
      .set("authorization", `${token}`);
    expect(res2.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res2.statusCode).toBe(200);
  });

  // ur-14 Saving a post with an invalid post ID (does not exist)
  test("Save post with invalid post ID", async () => {
    const postID = "80081E5"; // Invalid ID

    const res = await request(baseURL)
      .post("/savePost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(400);
  });

  // ur-15 Saving a post with no authorization token
  test("Save post with no authorization token", async () => {
    const postID = "64114c9aa062df80e376d3e6"; // Post 3

    const res = await request(baseURL).post("/savePost/" + postID);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  // ur-16 Saving a post with no post ID
  test("Save post with no post ID", async () => {
    const res = await request(baseURL)
      .post("/savePost")
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(404);
  });

  /* Unit tests for removeSavedPost route */

  // ur-17 Removing a valid post that the user does not have saved
  test("Remove a post that the user does not have saved", async () => {
    const postID = "64114c9aa062df80e376d3e6"; // Post 3

    const res = await request(baseURL)
      .delete("/removedSavedPost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(404);
  });

  // ur-18 Removing an invalid post (does not exist)
  test("Remove a post that does not exist", async () => {
    const postID = "thisPostDoesNotExist"; // Invalid ID

    const res = await request(baseURL)
      .delete("/removedSavedPost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(400);
  });

  // ur-19 Removing a post that the user has saved
  test("Remove a post that the user has saved", async () => {
    const postID = "64134c6f84de83bc075d329e"; // Post 4

    // Saving post 4 for the purpose of this test
    const res = await request(baseURL)
      .post("/savePost/" + postID)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);

    // Attempting to remove it
    const res2 = await request(baseURL)
      .delete("/removedSavedPost/" + postID)
      .set("authorization", `${token}`);
    expect(res2.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res2.statusCode).toBe(200);
  });

  /* Unit tests for myPosts route */

  // ur-20 Viewing my posts with no posts created
  test("Viewing my posts with no posts created", async () => {
    const res = await request(baseURL)
      .get("/myPosts")
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  // ur-21 Viewing my posts with at least one post
  test("Viewing my posts with at least one post created", async () => {
    const body = {
      title: "Oreo Cereal",
      body: "You know you've always wanted to try this",
      tags: ["Oreos", "Cereal"],
    };

    // First creating a post with the user
    const res = await request(process.env.BASEURL)
      .post("/post")
      .send(body)
      .set("authorization", `${token}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
    var postID = res.body.newPost;

    // Then retrieving my posts
    const res2 = await request(baseURL)
      .get("/myPosts")
      .set("authorization", `${token}`);
    expect(res2.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res2.statusCode).toBe(200);
  });

  // Delete the test User from the database, as well as its posts

  afterAll(async () => {
    await mongoose
      .connect(process.env.MONGODB_URL, opts)
      .catch((err) => console.error("could not connect to mongo DB", err));

    const deleteUserPromise = await db.User.findOneAndDelete({
      username: testUsername,
    });
    Promise.all([deleteUserPromise]).then(() => {
      console.log("Deleted test user from database");
    });
    const deletePostPromise = await db.Post.findOneAndDelete({
      title: "Oreo Cereal",
    });
    Promise.all([deletePostPromise]).then(() => {
      console.log("Deleted test user's post from database");
    });

    expect(deleteUserPromise.username).toBe(testUsername);
    expect(deletePostPromise.title).toBe("Oreo Cereal");
    mongoose.connection.close();
  });
});
