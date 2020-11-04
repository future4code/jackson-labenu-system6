import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import knex from 'knex'
import dotenv from 'dotenv'


dotenv.config()
export const connection = knex ({
    client:'mysql',
    connection:{
        host:process.env.DB_HOTS,
        port:3306,
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})


const app: Express = express()
app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("Servidor Rodando")
})