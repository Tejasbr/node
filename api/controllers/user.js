const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

createHash = (password) =>{
    return new Promise((resolve,reject) =>{
        try{
            bcrypt.hash(password, 10 , function(err, hash) {
                if(!err){
                    resolve(hash);
                }else{
                    reject(err);
                }
            });
        }catch(e){
            reject(e);
        }
    })
    
}

verifyPassword = (newPassword, hash)=>{
    return new Promise((resolve,reject)=>{
        try{
            bcrypt.compare(newPassword, hash, function(err, result) {
                if(!err){
                    resolve(hash);
                }else{
                    reject(err);
                }
            });
        }catch(e){
            reject(e);
        }
    })
}

createToken = (playerid) =>{
    const token = jwt.sign({playerid}, 'secret', { expiresIn: '1h' });
    return token;
}

module.exports.register =async (req, res) =>{
    try{
    const player = {
        name: req.body.name,
        age: req.body.age,
        club: req.body.club,
        position: req.body.position,
        password:await createHash(req.body.password)
    }
    const footdata = await User.create(player);
    delete footdata._doc.password;
    res.json({
        message: "sucess!!!!",
        players: footdata
    })
}catch(e)
{
    res.json(e)
}
}

module.exports.login =async (req, res) =>{
    try{
    
    const user = await User.findOne({name: req.body.name});
    if(!user)
    {
       return res.json({
            message: "user not valid!!!!",
            players: user
        })
    }
    const isPasswordMatched =await verifyPassword(req.body.password, user.password);
    if(isPasswordMatched)
    {
        const token = createToken(user._id);
        delete user._doc.password;

        const resData = {
            token,
            ...user._doc
        }
       return res.json({
        message: "sucess!!!!",
        players: resData
    })
    }else{
        return res.json({
            message: "Password doesn't matched !!!!",
            players: user
        })
    }
}catch(e)
{
    res.json(e)
}
}

module.exports.getreq =async (req, res) =>{
    try{
        const footdata = await User.find();
        res.json({
        message: "sucess!!!!",
        players: footdata
    })
}catch(e)
{
    res.json(e)
}
}

module.exports.getreqById =async (req, res) =>{
    try{
        const footdata = await User.findById(req.params.id);
        res.json({
        message: "sucess!!!!",
        players: footdata
    })
}catch(e)
{
    res.json(e)
}
}
module.exports.patchdata =async (req, res) =>{
    try{
        // const footdata = await User.findById(req.params.id);
        // footdata.name=req.body.name;


        const update = await User.update({_id: req.playerid}, req.body);
        res.json({
        message: "success!!!!",
        players: update
    })
}catch(e)
{
    res.json(e)
}
}

module.exports.deletedata =async (req, res) =>{
    try{
        // const footdata = await User.findById(req.params.id);
        const footdata = await User.findById(req.playerid);
        const delete1 = await User.deleteOne(footdata);
        res.json({
        message: "success!!!!",
        players: delete1
    })
}catch(e)
{
    res.json(e)
}
}