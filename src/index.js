import  express  from "express";
import cors from 'cors';
import { CreateSurvey, GetPolls, GetResult, GetSurveys } from "./controllers/SurveyControllers.js";
import { MakeChoice, VoteChoice } from "./controllers/ChoiceControllers.js";

const server = express();
server.use(cors());
server.use(express.json());



server.get('/poll', GetSurveys)
server.post('/poll', CreateSurvey)
server.post('/choice', MakeChoice)
server.get('/poll/:id/choice', GetPolls)
server.post('/choice/:id/vote', VoteChoice)
server.get('/poll/:id/result', GetResult)


server.listen(5000, () => console.log("the magic happens on port 5000"))