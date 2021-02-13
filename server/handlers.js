const { executeQuery } = require('./executeQuery');

const PAGE_SIZE = process.env.PAGE_SIZE || 100;

const getQuery = (pageNumber, pageSize) => {
    return `SELECT * FROM users ORDER BY firstname OFFSET (${(pageNumber - 1) * pageSize}) ROWS FETCH NEXT ${pageSize} ROWS ONLY`
}

async function fetchUserList(pageNumber, pageSize = PAGE_SIZE) {
    try {
        const query = getQuery(pageNumber, pageSize);
        console.log("query", query)
        const result = await executeQuery(query);
        console.log("result", result)
        return result;
    }
    catch (error) {
        console.log("Error fetching account details", error)
        throw error;
    }
}

async function fetchUserCount(pageSize = PAGE_SIZE) {
    try {
        const query = 'SELECT COUNT(*) AS count FROM users';
        console.log("query", query)
        const result = await executeQuery(query);
        console.log("result", result)
        const count = result[0].count;
        return Math.ceil(count / pageSize);
    }
    catch (error) {
        console.log("Error fetching account details", error)
        throw error;
    }
}

module.exports = {
    fetchUserList,
    fetchUserCount,
}