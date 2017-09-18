const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'The name must be longer tan 2 chars.'
        },
        required: [true, 'You must specify the name.']
    },
    postCount: Number,
    posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
