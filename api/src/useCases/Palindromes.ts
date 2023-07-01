// Importações necessárias
import { Request, Response } from 'express';
// const prisma = new PrismaClient();

export default class PalindromeService {
  async listNumbers(req: Request, res: Response) {
    const { start, end } = req.body;

    if (typeof start !== 'number' || typeof end !== 'number') {
      return res.status(400).json({ message: 'Erro ao procurar por números palíndromos' });
    }

    // função para saber se o número é palíndromo
    function isPalindrome(num: number) {
      // convertendo o número para string
      const numStr = num.toString();

      // verificando se o número é igual ao seu inverso
      return numStr === numStr.split('').reverse().join('');
    }

    const palindromes = [];

    try {
      // percorrendo todo o intervalo proposto pelo usuário e adicionando os números palíndromos em um array
      for (let i = start; i <= end; i++) {
        if (isPalindrome(i)) {
          palindromes.push(i);
        }
      }

      // // criando o registro no banco de dados
      // await prisma.palindrome.create({
      //   data: {
      //     start,
      //     end,
      //     numbersPalindromes: palindromes.join(','),
      //   }
      // });

      // retornando o resultado
      res.json(palindromes);
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao procurar por números palíndromos' });
    }
  }
}
