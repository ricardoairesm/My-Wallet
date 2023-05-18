import db from "../app.js";


export async function listarMovimentacoes(req,res){
    const token = req.headers.authorization.replace("Bearer ", "");
    const session = await db.collection("sessions").findOne({ token: token });
    try {
        const movements = await db.collection("transactions").find({ userId: session.userId }).toArray();
        return res.send(movements);
    } catch (error) {
        console.log("erro na rota get /transactions", error);
        return res.status(500).send(error);
    }
}