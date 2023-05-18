import express from 'express';
import cors from 'cors';
import { listarMovimentacoes } from './controllers/listarMovimentacoes-controllers.js';
import { autentificarLogin } from './controllers/login-controllers.js';
import { autentificarCadastro } from './controllers/cadastro-controllers.js';
import { postarMovimentacao } from './controllers/movimentacao-controller.js';
import { autenticarToken } from './middlewares/autToken.js';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/sign-up", autentificarCadastro);
router.post("/sign-in", autentificarLogin);

router.use(autenticarToken);

router.get("/transactions", listarMovimentacoes);
router.post("/transactions/:type", postarMovimentacao);

export default router;