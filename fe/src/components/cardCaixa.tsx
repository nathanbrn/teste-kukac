import { formatCurrency } from '@/utils/formatCurrency';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardCaixaProps {
  price: number,
  payment: number,
  change: number,
  informations: any
}

export default function CardCaixa({
  price,
  payment,
  change,
  informations
}: CardCaixaProps) {

  function formatChangeAmount(changeAmount: any) {
    const formattedAmount = Object.entries(changeAmount)
      .map(([note, quantity]) => `${formatCurrency(Number(note))}: ${quantity}`)
      .join('\n | ');

    return formattedAmount;
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} className='text-blue-500' color="text.primary" gutterBottom>
          Informações
        </Typography>
        <Typography sx={{ fontSize: 14 }} className='text-blue-500' color="text.primary" gutterBottom>
          Preço: {formatCurrency(price)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} className='text-blue-500' color="text.primary" gutterBottom>
          Pagamento: {formatCurrency(payment)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} className='text-blue-500' color="text.primary" gutterBottom>
          Troco: {formatCurrency(change)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} className='text-blue-500' color="text.primary" gutterBottom>
          <span>Notas a serem entregues: </span>
          <br/>
          <span>{formatChangeAmount(informations.changeAmount)}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
