const getJson = (request, callback) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        try {
            callback(JSON.parse(body));
        } catch (error) {
            callback(null, error);
        }
    });
};

module.exports = { getJson };