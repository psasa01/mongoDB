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

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Mujo');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Mujo');
        assertName(joe.save(), done);

    });

    it('model instance can update', (done) => {
        assertName(joe.update({
            name: 'Mujo'
        }), done);
    });

    it('a model class can update', (done) => {
        assertName(
            User.update({
                name: 'Joe'
            }, {
                name: 'Mujo'
            }),
            done
        );

    });

    it('a model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({
                name: 'Joe'
            }, {
                name: 'Mujo'
            }),
            done
        );
    });

    it('a model class can find a record with id and update', (done) => {
        assertName(
            User.findByIdAndUpdate({
                _id: joe._id
            }, {
                name: 'Mujo'
            }),
            done
        );

    });
});


// tested on 09.12
