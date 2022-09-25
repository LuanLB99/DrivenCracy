import db from "../../db.js";
import joi from "joi";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";



async function MakeChoice(req, res){
       const pollId = res.locals.user
    try {
        const surveys = await db.collection('surveys').find().toArray();
        const surveyChoiced = surveys.find(survey => survey._id == pollId);
        if(!surveyChoiced){return res.sendStatus(404)};

        const choiceExist = await db.collection('choices').findOne({title});
        if(choiceExist){return res.sendStatus(409)};
        if(surveyChoiced.expireAt < dayjs().format("HH:mm DD-MM-YYYY") ){
            return res.sendStatus(403)
        }

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
             
        if(surveyChoiced.expireAt < dayjs().format("HH:mm DD-MM-YYYY") ){
            return res.sendStatus(403)
        }
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