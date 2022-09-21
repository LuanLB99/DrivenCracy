import  express  from "express";
import cors from 'cors';
import { CreateSurvey, GetSurveys } from "./controllers/SurveyControllers.js";


const server = express();
server.use(cors());
server.use(express.json());



server.get('/poll', GetSurveys)

server.post('/poll', CreateSurvey)


server.listen(5000, () => console.log("the magic happens on port 5000"))