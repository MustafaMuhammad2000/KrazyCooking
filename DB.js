const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    admin: {type: Boolean, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    date_created: {type: Date, required: true}
});

const postsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: Boolean, required: true},
    post_author: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

const commentsSchema = new mongoose.Schema({
    date_created: {type: Date, required: true},
    comment_author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    upvotes: {type: Number, required: true},
    body: {type: String, required: true}
});

const ingredientsSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

const tags = new mongoose.Schema({
    tag: String
});

const User = mongoose.model('Users', usersSchema);
const Post = mongoose.model('Posts', postsSchema);
const Comment = mongoose.model('Comments', commentsSchema);
const Ingredient = mongoose.model('Ingredients', ingredientsSchema);
const Tag = mongoose.model('Tags', tags);

module.exports = {
    User, Post, Comment, Ingredient, Tag
};