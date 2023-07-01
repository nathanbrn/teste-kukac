// Importações necessárias
import { Router } from 'express';
import PalindromeService from '../useCases/Palindromes';

// Instanciando o PalindromeService
const palindromeService = new PalindromeService();

// Innstanciando o Router do express da rota de palíndromos
export const palindromeRouter = Router();

// Rota para listar números palíndromos pelo intervalo proposto pelo usuário
palindromeRouter.post('/palindromes', palindromeService.listNumbers);
