// importações necessárias
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Veiculo from '../interfaces/Veiculo';

// instancia do prisma
const prisma = new PrismaClient();

// classe carro que implementa a interface veiculo
class Car implements Veiculo {

  // construtor da classe
  constructor(
    model: string,
    yearMan: number,
    amountPorts: number,
    brand: string,
  ) {
    this.model = model;
    this.yearMan = yearMan;
    this.amountPorts = amountPorts;
    this.brand = brand;
  }
  model: string;
  yearMan: number;
  amountPorts: number;
  brand: string;

}

// classe CarService
export default class CarService {
  async createCar(req: Request, res: Response) {
    // desestruturação do body
    const { model, yearMan, amountPorts, brand } = req.body;

    try {
      // instancia da classe Car
      const car = new Car(model, yearMan, amountPorts, brand);

      // validação do número de portas
      if (amountPorts < 2 || amountPorts > 4) {
        return res.status(400).json({ message: 'Número inválido de portas' });
      }

      // criação do carro no banco de dados
      await prisma.car.create({
        data: {
          model: car.model,
          yearMan: car.yearMan,
          amountPorts: car.amountPorts,
          brand: car.brand,
        }
      });

      // retorno do carro criado
      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao criar carro' });
    }
  }

  // método para listar os carros
  async listCars(req: Request, res: Response) {
    try {
      // busca no banco de dados
      const cars = await prisma.car.findMany();

      if (cars.length === 0) {
        return res.status(404).json({ message: 'Nenhum carro cadastrado' });
      }

      // retorno dos carros
      return res.status(200).json(cars);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao listar carros' });
    }
  }

}
