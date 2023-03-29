import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv';

import router from './routes/routes.js'

config({path:".env"});

// creating the server
const srvr = express()

// enabling cors to allow for communication between different servers
srvr.use(cors());

// parsing incoming JSON requests and placing parsed data within req.body
srvr.use(json())

// listening for any requests made to the server
srvr.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

// printing any requests made to the server
srvr.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routing requests to the server using the router specified in routes/routes.js
srvr.post('/api/general/signup', router)
srvr.post('/api/general/login', router)
srvr.post('/api/general/validateEmail', router)