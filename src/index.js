import  express  from "express";
import cors from 'cors';
import choiceroutes from "./routes/ChoiceRoutes.js";
import pollroutes from "./routes/SurveyRoutes.js";
const server = express();
server.use(cors());
server.use(express.json());


server.use(choiceroutes);
server.use(pollroutes);


server.listen(process.env.PORT, () => console.log("the magic happens on port 5000"))