const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'prod.env' });

function validateToken(req, res, next) {
    const accessToken = req.headers['authorization']
    if (!accessToken) return res.send('Access denied');
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) return res.send('Access denied, token expired or incorrect');
        req.userId = user.id;
        console.log(req.userId);
        next();
    })
};

function generateAccessToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET)
}

module.exports = {
    validateToken,
    generateAccessToken
}
