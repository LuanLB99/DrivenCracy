import joi from "joi";

const surveySchema = joi.object({
    title:joi.string().required().empty('').min(3)
})

export async function validateSurvey(req, res, next){
    const {title, expireAt} = req.body;

    const validation = surveySchema.validate({title});
    if(validation.error){return res.sendStatus(422)}
    next();
}


const choiceSchema = joi.object({
    title: joi.string().required().empty('').min(3)
})


export async function validateChoice(req,res,next){

    const {title, pollId} = req.body;

    const validation = choiceSchema.validate({title});

    if(validation.error){return res.sendStatus(422)}
    next();
}
