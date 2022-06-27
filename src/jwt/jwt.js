const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'prod.env' });

function validateToken(req, res, next) {
    const accessToken = req.headers['auth-token']
    if (!accessToken) return res.status(401).send('Access denied');
    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET)
        req.user = decoded
        next()
    } catch (ex) {
        res.status(400).send('Invalid token')
    }
};

function generateAccessToken(_id, name) {
    return jwt.sign({ 
       name:name,
       id:_id }, process.env.SECRET)
}

module.exports = {
    validateToken,
    generateAccessToken
}
