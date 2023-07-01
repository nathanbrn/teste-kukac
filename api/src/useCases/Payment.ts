// Importações necessárias
import { Request, Response } from 'express';

// classe PaymentService
export default class PaymentService {

  async Amount(req: Request, res: Response) {
    const { price, payment } = req.body;

    function calculateChangeAmount(price: number, payment: number): Record<number, number> {
      let change = payment - price;

      const notes: number[] = [100, 10, 1];
      const changeAmount: Record<number, number> = {};

      for (const note of notes) {
        if (change >= note) {
          const noteCount = Math.floor(change / note);
          changeAmount[note] = noteCount;
          change -= noteCount * note;
        }
      }

      return changeAmount;
    }

    // verifica se o preço ou o pagamento não foram informados
    if (!price || !payment) {
      return res.status(400).json({ error: 'Preço ou pagamento não foram informados!' });
    }

    try {
      // convertendo o preço e o pagamento para float
      const parsedPrice = parseFloat(price);
      const parsedPayment = parseFloat(payment);

      // verificando se o preço ou o pagamento não são um número
      if (isNaN(parsedPrice) || isNaN(parsedPayment)) {
        return res.status(400).json({ error: 'Preço ou pagamento inválido!' });
      }

      // criando variáveis para calcular o troco e armazenar resultado
      const changeAmount = calculateChangeAmount(parsedPrice, parsedPayment);
      const change: number = parsedPayment - parsedPrice;

      // encapsulando tudo em uma variavel
      const response = {
        price: parsedPrice.toFixed(2),
        payment: parsedPayment.toFixed(2),
        change: change.toFixed(2),
        changeAmount
      };

      // retornando o resultado
      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao calcular a quantidade de notas!' });
    }
  }
}
