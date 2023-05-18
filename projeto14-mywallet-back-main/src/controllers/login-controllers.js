import db from '../app.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';

const validData = (schema, data) => !schema.validate(data).error;

const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
});

export async function autentificarLogin(req, res) {
    const { email, senha } = req.body;
    if (!validData(loginSchema, req.body)) {
        console.log("Confira se os campos foram preenchidos corretamente")
        return res.sendStatus(422);
    }
    const user = await db.collection('users').findOne({ email });
    if (user && bcrypt.compareSync(senha, user.senha)) {
        const token = uuid();

        await db.collection("sessions").updateOne({
            userId: user._id
        }, {
            $set: {
                userId: user._id,
                token: token,
            }
        }, { upsert: true });
        return res.send({
            user: {
                nome: user.nome,
                email: user.email
            },
            token: token
        }).sendStatus(201);
    } else {
        return res.status(500).send('E-mail ou senha incorretos')
    }
}