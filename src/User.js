'use strict'
function User(id) {
    const _id = id;
    const _timeline = [];

    function post(postMessage) {
        _timeline.push(postMessage);
    }

    return {
        timeline : () => _timeline,
        post : post
    }

}

module.exports = User;
