const sessionaIdToUserMap = new Map();

function setUser(id, user) {
    sessionaIdToUserMap.set(id, user)
};

function getUser(id) {
   return sessionaIdToUserMap.get(id)
};

module.exports = {
    setUser,
    getUser,
}