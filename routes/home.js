
require('dotenv').config({ path:process.cwd()+"/.env" })
const router = require('express').Router();

router.get('/', (req,res) => {
    res.sendFile(process.cwd()+'/views/home.html');
})


module.exports = router;