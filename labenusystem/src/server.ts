import express, {Express, Request, Response} from 'express'
import cors from 'cors'




const app: Express = express()
app.use(express.json())
app.use(cors())

app.get("/", (request: Request, response: Response)=>{
    return response.json({message: "oi"})
})

app.listen(3003, ()=>{
    console.log("Servidor Rodando")
})
