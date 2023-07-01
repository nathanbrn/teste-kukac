import { Request, Response } from 'express';
import PalindromeService from '../useCases/Palindromes';

describe('PalindromeService', () => {
  let palindromeService: PalindromeService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    palindromeService = new PalindromeService();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  describe('listNumbers', () => {
    it('Deve retornar os números palindromos dentro do intervalo descrito', () => {
      req.body = { start: 10, end: 20 };
      palindromeService.listNumbers(req, res);
      expect(res.json).toHaveBeenCalledWith([11]);
    });

    it('Não deve retornar nenhum número', () => {
      req.body = { start: 20, end: 21 };
      palindromeService.listNumbers(req, res);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Deve retornar um erro com status code 400', () => {
      req.body = { start: 'a', end: 10 };
      palindromeService.listNumbers(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao procurar por números palíndromos' });
    });

    it('Deve retornar um erro', () => {
      req.body = { start: null, end: null };
      palindromeService.listNumbers(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao procurar por números palíndromos' });
    });
  });
});
