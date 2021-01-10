const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.verifyToken = (req,res,next)=>{
    try{
        const token = req.headers['authorization'];
        console.log("token", req.token);
    if(!token)
    {
        return res.json({
            message: "Authentication Failed (token is Empty)!!!!",
            players: null
        })
    }
    else{
        jwt.verify(token, 'secret',async function(err, decoded) {
           if(!err)
           {
                console.log("decoded value", decoded);
                const user = await User.findOne({_id: decoded.playerid});
                if(!user)
                {
                    return res.json({
                        message: "User Not Found!!!!!!",
                        statusCode: 401
                    })
                }
                req.playerid = decoded.playerid;
                next();
           }
           else{
            return res.json({
                message: "Authentication Failed (token not matched)!!!!",
                players: null
            })
           }
          });
    }
    }catch(e)
    {
        res.json(e);
    }
    
}