'use strict'
function PostAction(userRepository) {
    const _userRepository = userRepository;

    return {
        execute : (userId, postMessage) => {
            let user = _userRepository.getUser(userId);
            user.post(postMessage);
        }
    }
}

module.exports = PostAction;
