import dayjs from "dayjs"
import db from '../app.js';
import joi from 'joi';



const validData = (schema, data) => !schema.validate(data).error;
const transactionSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required(),
});


export async function postarMovimentacao(req,res){
    try {
        const { valor, descricao } = req.body;
        const { type } = req.params;
        const token = req.headers.authorization.replace("Bearer ", "");
        const session = await db.collection("sessions").findOne({ token: token });
        const dia = dayjs().format("DD/MM");
        if (!validData(transactionSchema, req.body)) {
            console.log("Confira se os campos foram preenchidos corretamente")
            return res.sendStatus(422);
        }
        await db.collection("transactions").insertOne({
            valor: valor,
            descricao: descricao,
            userId: session.userId,
            type: type,
            dia: dia
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500).send(error);
    }
}