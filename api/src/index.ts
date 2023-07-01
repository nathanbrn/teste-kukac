// Importações necessárias
import cors from 'cors';
import express from 'express';
import { cepsRouter } from './routes/ceps.routes';
import { palindromeRouter } from './routes/palindromes.routes';
import { paymentRouter } from './routes/payment.routes';
import { vehiclesRouter } from './routes/vehicles.routes';

// Definindo a instância do express
const app = express();

// Definindo a porta
const PORT = 3001;

// Definindo o tipo de conexão do body como json
app.use(express.json());

// Setando o cors para não haver problemas com o Cross-Origin
app.use(cors({
  origin: '*',
}));

// Definindo as rotas usadas na aplicação
app.use([
  palindromeRouter,
  paymentRouter,
  vehiclesRouter,
  cepsRouter,
]);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${PORT}`);
});
