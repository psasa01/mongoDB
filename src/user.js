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
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

UserSchema.pre('remove', function (next) {
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({
            _id: {
                $in: this.blogPosts
            }
        })
        .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
