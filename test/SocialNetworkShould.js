'use strict'
let should = require('chai').should();

let User = require('../src/User.js');
let PostAction = require('../src/Actions/PostAction.js');
let ReadTimelineAction = require('../src/Actions/ReadTimelineAction.js');
let FollowUserAction = require('../src/Actions/FollowUserAction.js');

describe('Social Networking Actions', () => {
    let userId = 'anyId';
    let userMessage = 'anyMessage';
    let user = User(userId);
    let userRepository = {
        getUser : (id) => user
    }

    describe('Post Action Should', () => {
        let postAction = PostAction(userRepository);

        it('let a user publish a message in his personal timeline', () => {
            postAction.execute(userId, userMessage);
            user.timeline()[0].should.be.equal(userMessage);
        })
    });

    describe('Read Action Should', () => {
        let readAction = ReadTimelineAction(userRepository);

        it('let a user read anothers timeline', () => {
            let timeline = readAction.execute(userId);
            timeline[0].should.be.equal(userMessage);
        })
    });

    describe('Follow User Action Should', () => {
        let userToFollowId = 'userToFollowId';
        let userToFollow = User(userToFollowId);
        let userRepository = {
            getUser : (id) => {
                if (id === userId) {
                    return user;
                } else if (id === userToFollowId) {
                    return userToFollow;
                }
            }
        }
        let followUserAction = FollowUserAction(userRepository);
        it('let a user follow another', () => {
            followUserAction.execute(userId, userToFollowId);
            user.followedUsers()[0].should.be.deep.equal(userToFollow);
        });

    })
})
