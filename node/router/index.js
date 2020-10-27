var express = require('express');
const router = express.Router();
var loginRouter = require('./loginRouter')

router.use('/', loginRouter)


module.exports = router;