const Joi = require("joi");

const userRegister = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()?]{3,30}$")),
  dateOfBirth: Joi.date(),
});

const userLogin = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()?]{3,30}$")),
});

const updatePass = Joi.object({
  currentPassword: Joi.string().pattern(
    new RegExp("^[a-zA-Z0-9!@#$%^&*()?]{3,30}$")
  ),
  newPassword: Joi.string().pattern(
    new RegExp("^[a-zA-Z0-9!@#$%^&*()?]{3,30}$")
  ),
});

function validateRegister(req, res, next) {
  const { error } = userRegister.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

function validateLogin(req, res, next) {
  const { error } = userLogin.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
function validateUpdatePass(req, res, next) {
  const { error } = updatePass.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

const createPost = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(5).max(1000).required(),
  tags: Joi.array().items(Joi.string().max(20)).required(),
});

function validatePost(req, res, next) {
  const { error } = createPost.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

const createRecipe = Joi.object({
  body: Joi.string().min(5).max(1000).required(),
});

function validateRecipe(req, res, next) {
  const { error } = createRecipe.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

const createReview = Joi.object({
  body: Joi.string().min(5).max(1000).required(),
  rating: Joi.number().min(0).max(5).required(),
});

function validateReview(req, res, next) {
  const { error } = createReview.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (!req.file) {
    return res.status(400).send("No file found");
  }
  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdatePass,
  validatePost,
  validateRecipe,
  validateReview,
};
