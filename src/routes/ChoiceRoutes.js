import  express  from "express";
import { MakeChoice, VoteChoice } from "../controllers/ChoiceControllers.js";
import { validateChoice } from "../middleweres/Validations.js";

const routes = express.Router();

routes.post('/choice',validateChoice, MakeChoice);
routes.post('/choice/:id/vote', VoteChoice);

export default routes;