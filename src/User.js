'use strict'
function User(id) {
    const _id = id;
    const _timeline = [];
    const _followedUsers = [];

    function post(postMessage) {
        _timeline.push(postMessage);
    }

    function follow(user) {
        _followedUsers.push(user);
    }

    return {
        timeline : () => _timeline,
        followedUsers : () => _followedUsers,
        post : post,
        follow : follow,
        id: _id
    }

}

module.exports = User;
