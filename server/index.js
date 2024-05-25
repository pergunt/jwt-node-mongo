import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router'
import {errorMiddleware} from './middlewares'

const app = express();
const {PORT, DATABASE_URL} = process.env || 5123

app.use(cookieParser())
app.use(express.json())
app.use(cors())
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
