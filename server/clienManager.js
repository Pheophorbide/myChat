module.exports = function () {
    const  users = new Map();

    function isUserNameUnavailable(userName) {
        return users.has(userName)
    }

    function registerUser(userName) {
        users.set(userName, true);
        return getUsersArray();
    }

    function removeUser(userName) {
        users.delete(userName);
        return getUsersArray();
    }

    function getUsersArray() {
        const array = [];
        for (let key of users.keys()) {
            array.push(key)
        }

        return array;
    }

    return {
        isUserNameUnavailable,
        registerUser,
        removeUser
    }
};