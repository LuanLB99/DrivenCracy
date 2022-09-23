import db from "../../db.js";
import joi from "joi";

const surveySchema = joi.object({
    title:joi.string().required().empty('').min(3)
})

async function GetSurveys (req, res){

    try {
        const surveys = await db.collection('test').find().toArray();
        return res.send(surveys)
    } catch (error) {
        console.log(error.message)
    }
    res.send("ok")
}

async function CreateSurvey (req, res){
    const {title, expireAt} = req.body;

    const validation = surveySchema.validate({title});

    if(validation.error){
        return res.sendStatus(422)
    }


    try {
        await db.collection('test').insertOne({
            title,
            expireAt
        })

        const survey = {title, expireAt};
       return res.status(201).send(survey)
    } catch (error) {
        console.log(error.message)
    }


    res.sendStatus(200);
}


async function GetPolls(req, res){
    const { id } = req.params;

    try {
        const polls = await db.collection('polls').find({pollId:id}).toArray();
        if(!polls){return res.sendStatus(404)}
        return res.send(polls);
    } catch (error) {
        console.log(error.message)
    }

    res.send("ok");
}

async function GetResult(req, res){
    const { id } = req.params;

    
}

export { GetSurveys, CreateSurvey, GetPolls }