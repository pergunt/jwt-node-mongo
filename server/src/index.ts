import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router'
import {errorMiddleware} from './middlewares'
import {checkEnvVars} from './utils'

const app = express();

const envVars = checkEnvVars()

if (!envVars) {
    process.exit(1);
}

const {PORT, DATABASE_URL, CORS_URLS} = envVars

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    // origin: FRONT_END_URL
    origin: function (origin, callback) {
        if (!CORS_URLS.includes(origin)) {
            callback(new Error('Not allowed'), false)
            return
        }

        callback(null, true)
    }
}))
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(DATABASE_URL)

        app.listen(PORT, () => console.log(`server started on PORT=${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
