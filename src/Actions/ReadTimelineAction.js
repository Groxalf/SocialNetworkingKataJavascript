'use strict'
function ReadTimelineAction(userRepository) {
    const _userRepository = userRepository;

    function execute(userId) {
        let user = userRepository.getUser(userId);
        return user.timeline();
    }

    return {
        execute
    }
}

module.exports = ReadTimelineAction;
