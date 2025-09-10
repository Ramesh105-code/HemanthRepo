const jwt = require('jsonwebtoken');
module.exports = function (req, res, next){
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({msg:'Token missing'});
    const token = auth.split(' ')[1];
    try{
        const dec = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = dec.id;
        next();
    }catch{
        res.status(401).json({msg: 'Invalid token'});
    }
};