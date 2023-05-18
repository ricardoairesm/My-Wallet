import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import router from "./routes.js";

dotenv.config();

const app = express();
app.use(router);
const PORT = 5000;

// conectando ao banco
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

await mongoClient.connect();
db = mongoClient.db();
export default db;





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});