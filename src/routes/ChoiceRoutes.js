import  express  from "express";
import { MakeChoice, VoteChoice } from "../controllers/ChoiceControllers.js";

const routes = express.Router();

routes.post('/choice', MakeChoice);
routes.post('/choice/:id/vote', VoteChoice);

export default routes;