import bcrypt from 'bcrypt';
import db from '../app.js';
import joi from 'joi';


const validData = (schema, data) => !schema.validate(data).error;

const usuarioSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    senha_conferir: joi.ref('senha')
}).with('senha', 'senha_conferir');


export async function autentificarCadastro(req,res){
    const { email, nome, senha } = req.body
    try {
        if (!validData(usuarioSchema, req.body)) {
            console.log("Confira se os campos foram preenchidos corretamente")
            return res.sendStatus(422);
        }
        const checkEmail = await db.collection("users").findOne({ email: req.body.email });
        if (checkEmail) return res.sendStatus(409);
        const passwordHash = bcrypt.hashSync(senha, 10);
        await db.collection('users').insertOne({
            email: email,
            nome: nome,
            senha: passwordHash
        })
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500).send(error);
    }
}