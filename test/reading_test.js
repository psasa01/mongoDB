const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => {
                done();
            });
    });
    it('finds user by name Joe', (done) => {
        User.find({
            name: 'Joe'
        }).then((users) => {
            console.log(users[0]._id);
            console.log(joe._id);
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });
    it('find user with particular ID', (done) => {
        User.findOne({
            _id: joe._id
        }).then((user) => {
            console.log(user);
            assert(user.name === 'Joe');
            done();
        })
    });
});


//just checking

//more tests
