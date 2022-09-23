import db from "../../db.js";
import joi from "joi";

const choiceSchema = joi.object({
    title: joi.string().required().empty('').min(3)
})

async function MakeChoice(req, res){
    const {title, pollId} = req.body;

    const validation = choiceSchema.validate({title});

    if(validation.error){return res.sendStatus(422)}

    try {
        const surveys = await db.collection('test').find().toArray();
        const surveyChoiced = surveys.find(survey => survey._id == pollId);
        if(!surveyChoiced){return res.sendStatus(404)};
        await db.collection('polls').insertOne({
            title,
            pollId
        })
    } catch (error) {
        console.log(error.message)
    }


    return res.sendStatus(201)
}


async function VoteChoice(req, res){
    const { id } = req.params;

    try {
        const polls = await db.collection('polls').find().toArray();
        const votedPoll = polls.find(poll => poll._id == id);
        db.collection("votes").insertOne({
            id:votedPoll._id,
            data:Date.now()
        })

        return res.send(votedPoll)
    } catch (error) {
        console.log(error.message)
    }
    res.send(id);
}


export {MakeChoice, VoteChoice}