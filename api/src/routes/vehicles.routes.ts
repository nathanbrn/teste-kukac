// Importações necessárias
import { Router } from 'express';
import CarService from '../useCases/Car';
import MotorbikeService from '../useCases/Motorbike';

// Instânciando as classes CarService e MotorbikeService
const carService = new CarService();
const motorbikeService = new MotorbikeService();

// criando a instancia de Router
export const vehiclesRouter = Router();

// criando a constante baseUrl
const baseUrl = '/vehicles';

// Rota para criar um carro
vehiclesRouter.post(`${baseUrl}/cars`, carService.createCar);

// Rota para listar os carros
vehiclesRouter.get(`${baseUrl}/cars`, carService.listCars);

// Rota para criar uma moto
vehiclesRouter.post(`${baseUrl}/motorbikes`, motorbikeService.createMoto);

// Rota para listar as motos
vehiclesRouter.get(`${baseUrl}/motorbikes`, motorbikeService.listMotorbikes);
