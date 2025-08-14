const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', req.body);
    }
    next();
};
const responseLogger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`[${new Date().toISOString()}] Response for ${req.method} ${req.url}`);
        console.log('Status:', res.statusCode);
        console.log('Response Body:', body);
        originalSend.apply(res, arguments); // Call the original send method
    };
    next();
};

module.exports = { requestLogger, responseLogger }