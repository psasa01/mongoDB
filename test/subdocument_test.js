const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'First post'
            }]
        });
        joe.save()
            .then(() => {

                User.findOne({
                        name: 'Joe'
                    })
                    .then((user) => {
                        assert(user.posts[0].title === 'First post');
                        done();
                    });
            });
    });
    it('can add subdocument to existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                user.posts.push({
                    title: 'All new post'
                });
                return user.save();
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'All new post');
                done();
            });

    });
});
