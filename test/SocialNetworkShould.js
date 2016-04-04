'use strict'
let should = require('chai').should();

let User = require('../src/User.js');
let PostAction = require('../src/Actions/PostAction.js');
let ReadTimelineAction = require('../src/Actions/ReadTimelineAction.js');
let FollowUserAction = require('../src/Actions/FollowUserAction.js');

function StubUserRepository() {

    const users = [];

    function getUser(userId) {
        for (let user of users) {
            if (userId === user.id) {
                return user;
            }
        }
    }

    function addUsers() {
        var args = Array.prototype.slice.call(arguments);
        args.forEach((user) => {
            users.push(user);
        })
    }

    return {
        getUser,
        addUsers
    }
}

describe('Social Networking Actions', () => {
    let userId = 'anyId';
    let userMessage = 'anyMessage';
    let user = User(userId);
    let userRepository = StubUserRepository();

    describe('Post Action Should', () => {
        userRepository.addUsers(user);
        let postAction = PostAction(userRepository);

        it('let a user publish a message in his personal timeline', () => {
            postAction.execute(userId, userMessage);
            user.timeline()[0].should.be.equal(userMessage);
        })
    });

    describe('Read Action Should', () => {
        userRepository.addUsers(user);
        let readAction = ReadTimelineAction(userRepository);

        it('let a user read anothers timeline', () => {
            let timeline = readAction.execute(userId);
            timeline[0].should.be.equal(userMessage);
        })
    });

    describe('Follow User Action Should', () => {
        let userToFollowId = 'userToFollowId';
        let userToFollow = User(userToFollowId);
        userRepository.addUsers(user, userToFollow);
        let followUserAction = FollowUserAction(userRepository);

        it('let a user follow another', () => {
            followUserAction.execute(userId, userToFollowId);
            user.followedUsers()[0].should.be.deep.equal(userToFollow);
        });

    })
})
