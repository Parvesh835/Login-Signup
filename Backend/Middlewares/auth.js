const jwt = require('jsonwebtoken')



const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
        .json({message: 'Unauthorized, JWT token us required'})
    }
    try {
        const decodedData = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decodedData;
        next()
    } catch (error) {
        return res.status(403)
        .json({message: 'Unauthorized, JWT token is wrong or expire'})
    }
}

module.exports = ensureAuthenticated;