
require('dotenv').config({ path:process.cwd()+"/.env" })
const router = require('express').Router();
const User = require(process.cwd()+"/models/user");

router.get('/', (req,res) => {
    res.sendFile(process.cwd()+'/views/home.html');
})
router.get('/users', (req,res) => {
    User.find({}, 'username status lastLogin -_id', (err, users) => {
        if(err) return res.json({ error:err })
        if(!users) return res.json({ error:"no users, contact administrator" })

        return res.json({ users:users })
    })
})


//posts
router.post('/message', (req,res) => {
    const {message} = req.body;
    console.log("routing",message)
})

module.exports = router;