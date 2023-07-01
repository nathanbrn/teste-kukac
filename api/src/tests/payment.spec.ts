import { Request, Response } from 'express';
import PaymentService from '../useCases/Payment';

describe('PalindromeService', () => {
  let paymentService: PaymentService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    paymentService = new PaymentService();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  describe('listNumbers', () => {
    it('Deve retornar o troco do pagamento, com o número minimo de cedulas especificas, o valor do troco, o preço, e o valor do pagamento', () => {
      req.body = { price: 200, payment: 300 };
      paymentService.Amount(req, res);
      expect(res.json).toHaveBeenCalledWith({
        price: '200.00',
        payment: '300.00',
        change: '100.00',
        changeAmount: {
          100: 1
        }
      });
    });

    it('Deve retornar um erro com status code 400 por não ter passado os parametros', () => {
      req.body = { price: null, payment: null };
      paymentService.Amount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Preço ou pagamento não foram informados!' });
    });

    it('Deve retornar um erro com status code 400 por ter passado strings no body da requisição', () => {
      req.body = { price: 'a', payment: '10' };
      paymentService.Amount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Preço ou pagamento inválido!' });
    });

    it('Deve retornar um erro com status code 400 por não conter as propriedades solicitadas', () => {
      req.body = { price: undefined, payment: undefined };
      paymentService.Amount(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Preço ou pagamento não foram informados!' });
    });
  });
});
