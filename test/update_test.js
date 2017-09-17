const assert = require('assert');
const User = require('../src/user');

describe('Updating user', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => done());
    });

    it('instance set n save', (done) => {
        joe.set('name', 'Mujo');
        joe.save()
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Mujo');
                done();
            });
    });

});
