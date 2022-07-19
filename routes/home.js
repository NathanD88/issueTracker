require('dotenv').config({ path:process.cwd()+"/.env" })
const router = require('express').Router();
const User = require(process.cwd()+"/models/user");
const Message = require(process.cwd()+'/models/message');

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
router.get('/messages', (req,res) => {
    Message.find({}, (err, msgs) => {
        if(err) return res.json({ error:err })

        return res.json({ messages:msgs })
    })
})

//posts
router.post('/message', (req,res) => {
    const {message} = req.body;
    console.log(message)
    const {recipient} = message;
    console.log("routing", message)
    User.findOne({ username:recipient }, (err, user) => {
        if(err) return res.json({error:err});
        if(!user) return res.json({error:"user does not exist"});
        let msg = new Message(message);
        msg.save(err => {
            if(err) return res.json({ error:err })

            return res.json({ message:msg} )
        })
    })
})
router.post('/delete', (req,res) => {
    const {id} = req.body;
    if(!id) return res.json({ error:"no id supplied" })

    // Message.deleteOne({ _id:id }, (err) => {
    //     if(err) return res.json({ error:err })

    //     return res.json({ deleted:true })
    // })
})

module.exports = router;