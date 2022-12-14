import db from "../../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


async function GetSurveys (req, res){

    try {
        const surveys = await db.collection('surveys').find().toArray();
        return res.send(surveys)
    } catch (error) {
        console.log(error.message)
    }
    res.send("ok")
}

async function CreateSurvey (req, res){
    const expireAt = res.locals.user;
    
    if(!expireAt){let newExpire = dayjs().add(30,'day').format('HH:mm DD-MM-YYYY')
    const survey = {title, expireAt:newExpire};
   await db.collection('surveys').insertOne({
        survey
    })
    return res.status(201).send(survey)
}

    
   
    try {
       await db.collection('surveys').insertOne({
            title,
           expireAt
        })

        return res.sendStatus(201)
       
    } catch (error) {
        console.log(error.message)
    }


    res.sendStatus(200);
}


async function GetPolls(req, res){
    const { id } = req.params;

    try {
        const polls = await db.collection('choices').find({pollId:id}).toArray();
        if(!polls){return res.sendStatus(404)}
        return res.send(polls);
    } catch (error) {
        console.log(error.message)
    }

    res.send("ok");
}

async function GetResult(req, res){
    const { id } = req.params;

    try {
        const choices = await db.collection('choices').find({pollId:id}).toArray();
        let number = choices[0].votes;
        let myChoice;
        for(let i = 0; i < choices.length; i++){
            const mynumber = choices[i].votes;
            console.log(number, mynumber)
            if(mynumber > number){
                number = choices[i].votes;
                myChoice = choices[i]; 
            }
        }
        const survey = await db.collection('surveys').findOne({_id: new ObjectId(id)});
            const result = {
                title:survey.title,
                expireAt:survey.expireAt,
                result:{
                    title:myChoice.title,
                    votes:myChoice.votes
                }
            }
        return res.send(result)
        
    } catch (error) {
        
    }

    res.sendStatus(201)
}

export { GetSurveys, CreateSurvey, GetPolls, GetResult }