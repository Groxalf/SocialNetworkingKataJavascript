'use strict'
let should = require('chai').should();

let User = require('../src/User.js');
let PostAction = require('../src/Actions/PostAction.js');

function ReadTimelineAction(userRepository) {
    const _userRepository = userRepository;

    function execute(userId) {
        let user = userRepository.getUser(userId);
        return user.timeline;
    }

    return {
        execute
    }
}


describe('Post Action Should', () => {
    let userId = 'anyId';
    let userMessage = 'anyMessage';
    let user = User(userId);
    let userRepository = {
        getUser : (id) => user
    }
    let postAction = PostAction(userRepository);

    it('let a user publish a message in his personal timeline', () => {
        postAction.execute(userId, userMessage);
        user.timeline[0].should.be.equal(userMessage);
    })
})

describe('Read Action Should', () => {
    let userId = 'anyId';
    let userMessage = 'anyMessage';
    let user = User(userId);
    user.post(userMessage);
    let userRepository = {
        getUser : (id) => user
    }
    let readAction = ReadTimelineAction(userRepository);

    it('let a user read anothers timeline', () => {
        let timeline = readAction.execute(userId);
        timeline[0].should.be.equal(userMessage);
    })
})
