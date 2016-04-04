'use strict'
let should = require('chai').should();

let User = require('../src/User.js');
let PostAction = require('../src/Actions/PostAction.js');

describe('Post Action Should', () => {
    it('let a user publish a message in his personal timeline', () => {
        let userId = 'anyId';
        let userMessage = 'anyMessage';
        let user = User(userId);
        let userRepository = {
            getUser : (id) => user
        }
        let postAction = PostAction(userRepository);
        postAction.execute(userId, userMessage);
        user.timeline[0].should.be.equal(userMessage);
    })
})
