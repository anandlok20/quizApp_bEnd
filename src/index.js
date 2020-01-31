const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const urouter = require('./routers/userRouter')
const trouter = require('./routers/testRouter')
const qrouter = require('./routers/quesRouter')

const com = express()
const portNo = process.env.portNo | 3000
    // console.log("process", process.env.portNo);
com.use(cors())
com.use(express.json())
    // com.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next();
    // });
com.use(urouter)
com.use(qrouter)
com.use(trouter)

com.listen(portNo, () => {
    console.log("Listening on port no : " + portNo)
})