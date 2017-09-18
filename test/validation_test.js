const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

    it('requires a user name', () => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.name;
        assert(message === 'You must specify the name.');
    });

    it('requires a user name longer than 2 chars', () => {
        const user = new User({
            name: 'Al'
        });
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.name;
        assert(message === 'The name must be longer tan 2 chars.');
    });

    it('disallows invalid records from being save', (done) => {
        const user = new User({
            name: 'Al'
        });
        user.save().catch((validationResult) => {
            const {
                message
            } = validationResult.errors.name;
            assert(message === 'The name must be longer tan 2 chars.');
            done();
        });
    });
});
