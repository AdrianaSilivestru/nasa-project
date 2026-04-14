function getPagination(query) {
    const limit = Math.abs(query.limit) || 0; //in mongo, if set to 0, returns all
    const page = Math.abs(query.page) || 1;
    const skip = (page - 1) * limit;
    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination
};