// importações necessárias
import { Request, Response } from 'express';
import { api } from '../utils/api';


// classe CepsService
export default class CepsService {
  // método para listar os CEPs por procura do usuário
  async listCeps(req: Request, res: Response) {
    // desestruturação do corpo da requisição
    const { ceps } = req.body;

    // verificação se o corpo da requisição está vazio ou não contém 5 CEPs
    if (!ceps || ceps.length !== 5) {
      return res.status(400).json({ error: 'Informe 5 CEPs' });
    }

    // array para armazenar os CEPs
    const cepsArray = [];

    try {
      // laço de repetição para percorrer o array de CEPs
      for (const cep of ceps) {
        const cepFormated: string = cep.toString();
        const response = await api.get(`/${cepFormated}/json/`);
        const data = response.data;
        cepsArray.push(data);
      }

      // retorno dos CEPs
      return res.json(cepsArray);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao procurar por CEPs' });
    }
  }
}
