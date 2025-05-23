import express from 'express'
import { configDotenv } from 'dotenv'
import authRoutes from "./routes/authRoutes.js"
import formRoutes from './routes/formRoutes.js'
import prisma from './lib/prisma.js'
import cors from 'cors'
const app = express()
configDotenv()
app.use(express.json())

app.use(cors()); 

const URL = 3000


app.use("/auth", authRoutes)
app.use('/form', formRoutes)

app.listen(URL, () => {
    console.log(`server is live on the http://localhost:${URL}`)
})


prisma.$connect().then(() => {
    console.log("database connected successfully")
}).catch((err) => {
    console.log("pirsma connecton error", err
    )
})