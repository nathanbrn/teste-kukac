// Importações necessárias
import { Router } from 'express';
import PaymentService from '../useCases/Payment';

// Instanciando o PaymentService
const paymentService = new PaymentService();

// Instanciando o Router do express da rota de pagamentos
export const paymentRouter = Router();

// Rota para calcular o valor de troco
paymentRouter.post('/payments', paymentService.Amount);
