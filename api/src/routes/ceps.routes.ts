// importações necessárias
import { Router } from 'express';
import CepsService from '../useCases/Ceps';

// instância da classe CepsService
const cepsService = new CepsService();

// criação do roteador
export const cepsRouter = Router();

// rota para listar os CEPs por procura do usuário
cepsRouter.post('/ceps', cepsService.listCeps);
