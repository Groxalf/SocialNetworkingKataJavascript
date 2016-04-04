'use strict'
let should = require('chai').should();

function User(id) {
    const _id = id;
    const _timeline = [];

    function post(postMessage) {
        _timeline.push(postMessage);
    }

    return {
        timeline : _timeline,
        post : post
    }

}

function PostAction(userRepository) {
    const _userRepository = userRepository;

    return {
        execute : (userId, postMessage) => {
            let user = _userRepository.getUser(userId);
            user.post(postMessage);
        }
    }
}

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
