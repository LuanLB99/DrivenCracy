import  express from "express";
import { CreateSurvey, GetPolls, GetResult, GetSurveys } from "../controllers/SurveyControllers.js";

const routes = express.Router();

routes.get('/poll', GetSurveys);
routes.get('/poll/:id/choice', GetPolls)
routes.get('/poll/:id/result', GetResult)
routes.post('/poll', CreateSurvey);

export default routes;