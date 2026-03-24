const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Exporting the middleware
module.exports = authenticateJWT;

// For Socket.IO authentication
function socketAuthenticate(socket, next) {
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return next(new Error('Unauthorized'));
            }
            socket.user = user;
            next();
        });
    } else {
        next(new Error('Unauthorized'));
    }
}

module.exports.socketAuthenticate = socketAuthenticate;
