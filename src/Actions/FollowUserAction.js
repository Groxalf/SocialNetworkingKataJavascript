'use strict'

function FollowUserAction(userRepository){
    const _userRepository = userRepository;

    function execute(requestingUserId, userToFollowId) {
        let requestingUser = _userRepository.getUser(requestingUserId);
        let userToFollow = _userRepository.getUser(userToFollowId);
        requestingUser.follow(userToFollow);
    }

    return {
        execute
    }
}

module.exports = FollowUserAction;
