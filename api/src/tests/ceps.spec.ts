import { Request, Response } from 'express';
import CepsService from '../useCases/Ceps';

describe('CepsService', () => {
  let cepsService: CepsService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    cepsService = new CepsService();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('listCeps', () => {
    it('Este metodo deve retornar as informações dos CEPs', async () => {
      req.body = {
        ceps: ['01001000', '01002000', '01003000', '01004000', '01005000'],
      };

      await cepsService.listCeps(req, res);

      const responseMock = [
        {
          'cep': '01001-000',
          'logradouro': 'Praça da Sé',
          'complemento': 'lado ímpar',
          'bairro': 'Sé',
          'localidade': 'São Paulo',
          'uf': 'SP',
          'ibge': '3550308',
          'gia': '1004',
          'ddd': '11',
          'siafi': '7107'
        },
        {
          'cep': '01002-000',
          'logradouro': 'Rua Direita',
          'complemento': 'lado par',
          'bairro': 'Sé',
          'localidade': 'São Paulo',
          'uf': 'SP',
          'ibge': '3550308',
          'gia': '1004',
          'ddd': '11',
          'siafi': '7107'
        },
        {
          'cep': '01003-000',
          'logradouro': 'Rua José Bonifácio',
          'complemento': 'lado par',
          'bairro': 'Sé',
          'localidade': 'São Paulo',
          'uf': 'SP',
          'ibge': '3550308',
          'gia': '1004',
          'ddd': '11',
          'siafi': '7107'
        },
        {
          'cep': '01004-000',
          'logradouro': 'Rua Barão de Paranapiacaba',
          'complemento': '',
          'bairro': 'Sé',
          'localidade': 'São Paulo',
          'uf': 'SP',
          'ibge': '3550308',
          'gia': '1004',
          'ddd': '11',
          'siafi': '7107'
        },
        {
          'cep': '01005-000',
          'logradouro': 'Rua Benjamim Constant',
          'complemento': '',
          'bairro': 'Sé',
          'localidade': 'São Paulo',
          'uf': 'SP',
          'ibge': '3550308',
          'gia': '1004',
          'ddd': '11',
          'siafi': '7107'
        }
      ];

      expect(res.json).toHaveBeenCalledWith(responseMock);
    });

    it('Este metodo deve retornar pedindo para o usuário informar os 5 CEPs com status 400', async () => {
      req.body = {
        ceps: ['01001000', '01002000', '01003000', '01004000'],
      };

      await cepsService.listCeps(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Informe 5 CEPs' });
    });
  });
});
