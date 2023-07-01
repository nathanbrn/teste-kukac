import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import MotorbikeService from '../useCases/Motorbike';

const prisma = new PrismaClient();

describe('MotorbikeService', () => {
  let motorbikeService: MotorbikeService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    motorbikeService = new MotorbikeService();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createMotorbike', () => {
    it('Deve ser possivel criar uma moto', async () => {
      req.body = {
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 2,
        passengers: 2,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 2,
        passengers: 2,
      });
    });

    it('Deve retornar um erro 400, pois o número de rodas excede o esperado', async () => {
      req.body = {
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 3,
        passengers: 2,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Número inválido de rodas' });
    });

    it('Deve retornar um erro 400, pois o número de rodas é menos que o esperado', async () => {
      req.body = {
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 1,
        passengers: 2,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Número inválido de rodas' });
    });

    it('Deve retornar um erro 400, pois o número de passageiros é menos que o esperado', async () => {
      req.body = {
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 2,
        passengers: 0,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Número inválido de passageiros' });
    });

    it('Deve retornar um erro 400, pois o número de passageiros é mais que o esperado', async () => {
      req.body = {
        model: 'Fan',
        yearMan: 2012,
        brand: 'Honda',
        whells: 2,
        passengers: 3,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Número inválido de passageiros' });
    });

    it('Deve retornar um erro com status code 400', async () => {
      jest.spyOn(prisma.motorbike, 'create').mockRejectedValueOnce(new Error());

      req.body = {
        model: null,
        yearMan: 2012,
        brand: 'Honda',
        whells: 2,
        passengers: 2,
      };

      await motorbikeService.createMoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar moto' });
    });
  });

  describe('listMotorbikes', () => {
    it('Deve listar todos as motos cadastradas no banco de dados', async () => {
      const motors = await prisma.motorbike.findMany();

      jest.spyOn(prisma.motorbike, 'findMany').mockResolvedValueOnce(motors as any);

      await motorbikeService.listMotorbikes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(motors);
    });

    // // Teste para observar se nenhuma moto está cadastrado, por favor, apenas descomentar quando for testar, e comentar o teste acima, junto com o teste de criação de carro
    // it('Deve mostrar um erro com status 404, se não tiver nenhum carro cadastrado. OBS: Irá dar falha, pois sempre vai cadastrar um carro no teste de create!', async () => {
    //   const motors = prisma.motorbike.findMany();

    //   jest.spyOn(prisma.motorbike, 'findMany').mockResolvedValueOnce(motors as any);

    //   await motorbikeService.listMotorbikes(req, res);

    //   expect(res.status).toHaveBeenCalledWith(404);
    //   expect(res.json).toHaveBeenCalledWith({ message: 'Não há motos cadastradas' });
    // });
  });
});
