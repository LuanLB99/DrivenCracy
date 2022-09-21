import  express  from "express";
import cors from 'cors';


const server = express();
server.use(cors());
server.use(express.json());

server.get('/poll', (req, res) =>{
    res.send("ta funcionando aí, irmão!")
})


server.listen(5000, () => console.log("the magic happens on port 5000"))