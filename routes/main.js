require('dotenv').config({ path:process.cwd()+"/.env" })
const router = require('express').Router();
const User = require(process.cwd()+"/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

// middleware
const validateUserInput = (req,res,next) => {
    const {username, password} = req.body;
    if(!(username && password)) return res.json({ error:"missing username or password" });

    next();
}
const validateRegisterInput = (req,res,next) => {
    const {username, password, passwordConfirm} = req.body;
    if(!(username && password && passwordConfirm)) return res.json({ error:"missing credentials" });
    if(password != passwordConfirm) return res.json({ error:"passwords do not match" })
    next();
}
const validatePasswordComplexity = (req,res,next) => {
    const {username, password} = req.body;

    if(password.includes(username)) return res.json({ error:"password cannot contain username" });

    const hasCap = /[A-Z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const long = password.length >= 8;

    if(!(hasCap && hasNum && long)) return res.json({error:"weak password", hasCap, hasNum, long})

    next();
}

// post requests
router.post('/login', validateUserInput, (req,res) => {
    User.findOne({ username: req.body.username }, 'username status lastLogin password -_id', (err, user) => {
        if(err) return res.json({ error:err });
        if(!user) return res.json({ error:"username does not exist" });
        
        let match = bcrypt.compareSync(req.body.password, user.password, err => {
            if(err)return res.json({ error:err })
        });
        if(match){
            let dbuser = {
                username: user.username, 
                status: user.status, 
                lastLogin: user.lastLogin
            }
            console.log(dbuser)
            let token = jwt.sign(dbuser, process.env.JWT_SECRET, { expiresIn: '60s' });
            dbuser.token = token;
            return res.json({ dbuser })
        } else {
            return res.json({ error:"incorrect password" })
        }
    })
})
router.post('/register', validateRegisterInput, validatePasswordComplexity, (req,res) => {
    const {username,password} = req.body;
    User.findOne({ username: username }, (err, user) => {
        if(err) return res.json({ error:err })
        if(user) return res.json({ error:"username already exists" })
        
        let hash = bcrypt.hashSync(password, salt, err => {
            if(err) return res.json({ error:err })
        });

        const newUser = new User({username, password:hash});
        console.log(newUser)
        newUser.save(err => {
            if(err) return res.json({ error:err });
        })
        return res.json({ dbuser:newUser });
    })
})
router.post('/decode', async(req,res) => {
    const {token} = req.body;
    if(!token) return res.json({ error:"invalid token" });

    let decoded = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return res.json({ error:err })
        return res.json({decoded:data})
    })

})

module.exports = router;