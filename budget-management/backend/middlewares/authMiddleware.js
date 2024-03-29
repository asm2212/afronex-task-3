const {verifyToken} = require('../config/jwt.js');

const authenticateUser = (req,res,next) => {
    const token = req.headers.authorization;
    
    if (!token){
        return res.status(401).json({error: 'Unauthorized'});
    }
    
    try{
        const decoded = verifyToken(token);
        req.user = decoded.user;
        next();
    }
    catch(error){
        console.log('Error in authentication', error);
        res.status(401).json({error: 'Unauthorized'});
    }
};
module.exports = authenticateUser;