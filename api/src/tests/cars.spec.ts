import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import CarService from '../useCases/Car';

const prisma = new PrismaClient();

describe('CarService', () => {
  let carService: CarService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    carService = new CarService();
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createCar', () => {
    it('Deve ser possivel criar um carro', async () => {
      req.body = {
        model: 'Audi',
        yearMan: 2022,
        amountPorts: 4,
        brand: 'Audi',
      };

      await carService.createCar(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        model: 'Audi',
        yearMan: 2022,
        amountPorts: 4,
        brand: 'Audi',
      });
    });

    it('Deve retornar um erro 400, por o número de portas informados', async () => {
      req.body = {
        model: 'Audi',
        yearMan: 2022,
        amountPorts: 5,
        brand: 'Audi',
      };

      await carService.createCar(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Número inválido de portas' });
    });

    it('Deve retornar um erro com status code 400', async () => {
      jest.spyOn(prisma.car, 'create').mockRejectedValueOnce(new Error());

      req.body = {
        model: null,
        yearMan: 2022,
        amountPorts: 4,
        brand: 'Audi',
      };

      await carService.createCar(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar carro' });
    });
  });

  describe('listCars', () => {
    it('Deve listar todos os carros cadastrados no banco de dados', async () => {
      const cars = await prisma.car.findMany();

      jest.spyOn(prisma.car, 'findMany').mockResolvedValueOnce(cars as any);

      await carService.listCars(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(cars);
    });

    // Teste para observar se nenhum carro está cadastrado, por favor, apenas descomentar quando for testar, e comentar o teste acima, junto com o teste de criação de carro
    // it('Deve mostrar um erro com status 404, se não tiver nenhum carro cadastrado. OBS: Irá dar falha, pois sempre vai cadastrar um carro no teste de create!', async () => {
    //   const cars = prisma.car.findMany();

    //   jest.spyOn(prisma.car, 'findMany').mockResolvedValueOnce(cars as any);

    //   await carService.listCars(req, res);

    //   expect(res.status).toHaveBeenCalledWith(404);
    //   expect(res.json).toHaveBeenCalledWith({ message: 'Nenhum carro cadastrado' });
    // });
  });
});
