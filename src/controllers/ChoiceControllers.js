import db from "../../db.js";
import joi from "joi";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


const choiceSchema = joi.object({
    title: joi.string().required().empty('').min(3)
})

async function MakeChoice(req, res){
    const {title, pollId} = req.body;

    const validation = choiceSchema.validate({title});

    if(validation.error){return res.sendStatus(422)}

    try {
        const surveys = await db.collection('surveys').find().toArray();
        const surveyChoiced = surveys.find(survey => survey._id == pollId);
        if(!surveyChoiced){return res.sendStatus(404)};

        const choiceExist = await db.collection('choices').findOne({title});
        if(choiceExist){return res.sendStatus(409)};
        const now = dayjs().format('HH:mm DD-MM-YYYY');

        console.log((dayjs(surveyChoiced.expireAt).isBefore(dayjs(now))))
        console.log(now, surveyChoiced.expireAt)
        await db.collection('choices').insertOne({
           title,
           pollId,
           votes:0,
           dateVote:[]
       })
    } catch (error) {
        console.log(error.message)
    }


    return res.sendStatus(201)
}


async function VoteChoice(req, res){
    const { id } = req.params;

    try {
        const votedChoice = await db.collection('choices').findOne({_id: new ObjectId(id)});
        if(!votedChoice){return res.sendStatus(404)};
        const surveys = await db.collection('surveys').find().toArray();
        const surveyChoiced = surveys.find(survey => survey._id == votedChoice.pollId);
        const newDate = [
            ...votedChoice.dateVote,{
                date:dayjs().format('HH:mm DD-MM-YYYY')
            }
        ];

        /*const now = dayjs().format("HH:mm DD-MM-YYYY");
             
        if(now > surveyChoiced.expireAt){
            return res.sendStatus(403)
        } */
    const newVote = votedChoice.votes +1;
    const newChoice = {...votedChoice, votes:newVote, dateVote:newDate};
    const att = await db.collection('choices').updateOne({_id:votedChoice._id},{$set: newChoice})
        return res.send(att)
    } catch (error) {
        console.log(error.message)
    }
    res.send(id);
}


export {MakeChoice, VoteChoice}