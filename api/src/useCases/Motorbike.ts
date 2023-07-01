// importações necessárias
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Veiculo from '../interfaces/Veiculo';

// instancia do prisma
const prisma = new PrismaClient();

// classe motorbike que implementa a interface veiculo
class Motorbike implements Veiculo {
  model: string;
  yearMan: number;
  brand: string;
  whells: number;
  passengers: number;

  // construtor da classe
  constructor(
    model: string,
    yearMan: number,
    brand: string,
    whells: number,
    passengers: number
  ) {
    this.model = model;
    this.yearMan = yearMan;
    this.brand = brand;
    this.whells = whells;
    this.passengers = passengers;
  }
}

// classe MotorbikeService
export default class MotorbikeService {
  // método para criar uma moto
  async createMoto(req: Request, res: Response) {
    // desestruturação do body
    const { model, yearMan, brand, whells, passengers } = req.body;

    try {
      // instancia da classe Motorbike
      const motorbike = new Motorbike(model, yearMan, brand, whells, passengers);

      // validação do número de rodas e passageiros
      if (whells < 2 || whells > 2) {
        return res.status(400).json({ message: 'Número inválido de rodas' });
      }
      if (passengers < 1 || passengers > 2) {
        return res.status(400).json({ message: 'Número inválido de passageiros' });
      }

      // criação da moto no banco de dados
      await prisma.motorbike.create({
        data: {
          model: motorbike.model,
          yearMan: motorbike.yearMan,
          brand: motorbike.brand,
          whells: motorbike.whells,
          passengers: motorbike.passengers,
        }
      });

      // retorno da moto criada
      return res.status(201).json(motorbike);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao criar moto' });
    }
  }

  // método para listar as motos
  async listMotorbikes(req: Request, res: Response) {
    try {
      // busca no banco de dados
      const motorbikes = await prisma.motorbike.findMany();

      if (motorbikes.length === 0) {
        return res.status(404).json({ message: 'Não há motos cadastradas' });
      }

      // retorno das motos
      return res.status(200).json(motorbikes);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao listar motos' });
    }
  }
}
