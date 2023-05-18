import db from "../app.js";

export async function autenticarToken(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);
    next();
}